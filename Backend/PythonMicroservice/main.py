from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from sentence_transformers import SentenceTransformer, util
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
import re

app = FastAPI()
model = SentenceTransformer("sentence-transformers/multi-qa-mpnet-base-dot-v1")
geolocator = Nominatim(user_agent="roomieya-app")

# --------------------------- Modelos ---------------------------

class Inmueble(BaseModel):
    id: int
    nombre: Optional[str]
    direccion: Optional[str]
    tipo: Optional[str]
    tamano: Optional[int]
    precio: Optional[float]
    servicios: Optional[str]
    latitud: Optional[float]
    longitud: Optional[float]
    descripcion: Optional[str]
    fechaCreacion: Optional[str]
    embeddingJson: Optional[str]
    imagenurl: Optional[str]

class ComparacionRequest(BaseModel):
    texto_usuario: str
    inmuebles: List[Inmueble]

# --------------------------- Utilidades ---------------------------

SERVICIOS_POSIBLES = ["wifi", "patio", "agua", "luz", "cable", "internet", "gas", "seguridad"]

def extraer_entidades(texto: str):
    texto = texto.lower()
    precio_max = None
    precio_min = None
    direccion = None
    tipo = None
    servicios = []

    # Precios máximos
    match_precio_max = re.search(r"(menos de|hasta|máximo)[^\d]{0,10}(\d{3,5})", texto)
    if match_precio_max:
        precio_max = float(match_precio_max.group(2))

    # Precios mínimos
    match_precio_min = re.search(r"(más de|mayor a|superior a|desde)[^\d]{0,10}(\d{3,5})", texto)
    if match_precio_min:
        precio_min = float(match_precio_min.group(2))

    for t in ["departamento", "habitación", "casa", "loft", "studio", "minidepartamento"]:
        if t in texto:
            tipo = t
            break

    direccion_match = re.search(r"(miraflores|san miguel|jesús maría|surco|barranco|la molina|lince|san isidro|cercado de lima|independencia)", texto)
    if direccion_match:
        direccion = direccion_match.group(1)

    for s in SERVICIOS_POSIBLES:
        if s in texto:
            servicios.append(s)

    return precio_min, precio_max, tipo, direccion, servicios

def obtener_coordenadas(lugar: str):
    try:
        location = geolocator.geocode(f"{lugar}, Lima, Perú", timeout=5)
        if location:
            return (location.latitude, location.longitude)
    except:
        return None

def calcular_puntaje(inmueble: Inmueble, precio_min, precio_max, tipo, direccion, servicios_usuario):
    score = 0
    explicacion = {
        "tipo": False,
        "precio": False,
        "ubicacion_exacta": False,
        "ubicacion_cercana": False,
        "servicios": []
    }

    if inmueble.precio:
        if precio_max and inmueble.precio <= precio_max:
            score += 3
            explicacion["precio"] = True
        elif precio_min and inmueble.precio >= precio_min:
            score += 3
            explicacion["precio"] = True

    if direccion and inmueble.direccion and direccion in inmueble.direccion.lower():
        score += 3
        explicacion["ubicacion_exacta"] = True
    elif direccion and inmueble.latitud and inmueble.longitud:
        destino = obtener_coordenadas(direccion)
        if destino:
            distancia = geodesic((inmueble.latitud, inmueble.longitud), destino).km
            if distancia < 2:
                score += 2
                explicacion["ubicacion_cercana"] = True

    if tipo and inmueble.tipo and tipo == inmueble.tipo.lower():
        score += 2
        explicacion["tipo"] = True

    if inmueble.servicios:
        servicios_inmueble = [s.strip().lower() for s in inmueble.servicios.split(",")]
        coincidencias = [s for s in servicios_usuario if s in servicios_inmueble]
        score += len(coincidencias)
        explicacion["servicios"] = coincidencias

    return score, explicacion

# --------------------------- Endpoint ---------------------------

@app.post("/buscar")
def buscar_inmuebles(data: ComparacionRequest):
    texto = data.texto_usuario
    precio_min, precio_max, tipo, direccion, servicios = extraer_entidades(texto)

    hay_tipo_coincidente = tipo is not None and any(
        i.tipo and i.tipo.lower() == tipo.lower()
        for i in data.inmuebles
    )

    puntuados = []

    for i in data.inmuebles:
        if hay_tipo_coincidente and tipo and i.tipo and tipo.lower() != i.tipo.lower():
            continue

        score, explicacion = calcular_puntaje(i, precio_min, precio_max, tipo, direccion, servicios)
        puntuados.append({
            "id": i.id,
            "puntaje": score,
            "explicacion": explicacion
        })

    puntuados_ordenados = sorted(puntuados, key=lambda x: x["puntaje"], reverse=True)

    if puntuados_ordenados and puntuados_ordenados[0]["puntaje"] > 0:
        return [
            {
                "id": p["id"],
                "explicacion": p["explicacion"]
            }
            for p in puntuados_ordenados if p["puntaje"] > 0
        ]

    # Fallback con embeddings
    descripciones = [
        f"{i.descripcion or ''}. Dirección: {i.direccion or ''}. Tipo: {i.tipo or ''}. "
        f"Precio: {i.precio or 0} soles. Servicios: {i.servicios or ''}."
        for i in data.inmuebles
    ]

    emb_usuario = model.encode(texto, convert_to_tensor=True)
    emb_inmuebles = model.encode(descripciones, convert_to_tensor=True)
    similitudes = util.cos_sim(emb_usuario, emb_inmuebles)[0]

    resultado_embeddings = sorted(
        zip(data.inmuebles, similitudes.tolist()),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "id": inm.id,
            "explicacion": None
        }
        for inm, sim in resultado_embeddings
    ]
