from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from sentence_transformers import SentenceTransformer, util
from rapidfuzz import process, fuzz
import re

app = FastAPI()
model = SentenceTransformer("sentence-transformers/multi-qa-mpnet-base-dot-v1")
geolocator = Nominatim(user_agent="roomieya-app")

SERVICIOS_POSIBLES = ["wifi", "patio", "agua", "luz", "cable", "internet", "gas", "seguridad", "jardín", "terraza"]

ZONAS_LIMA = {
    "la molina": ["la planicie", "camacho", "santa patricia", "sol de la molina", "musa", "el remanso"],
    "santiago de surco": ["las casuarinas", "monterrico", "surco viejo", "la castellana", "higuereta"],
    "miraflores": ["parque kennedy", "malecón", "larcomar", "reducto", "ovalito", "san antonio"],
    "san isidro": ["el olivar", "zona financiera", "country club", "corpac"],
    "san borja": ["san borja norte", "san borja sur", "las torres", "pentagonito"],
    "san miguel": ["magdalena vieja", "avenida faucett", "la marina", "costanera"],
    "magdalena del mar": ["ejército", "juan de aliaga", "malecón grau"],
    "pueblo libre": ["cuadra 10 bolívar", "universidad católica", "plaza bolívar"],
    "lince": ["risso", "avenida arequipa", "parque mariscal castilla"],
    "jesús maría": ["salaverry", "plaza san josé", "campo de marte"],
    "barranco": ["puente de los suspiros", "malecón", "san francisco", "el sol"],
    "cercado de lima": ["centro histórico", "plaza san martín", "avenida abancay", "jirón de la unión"],
    "independencia": ["megaplaza", "los olivos", "panamericana norte"],
    "san juan de miraflores": ["zona c", "ciudad de dios", "san juan"],
    "villa el salvador": ["zona industrial", "sector 3", "parque industrial"],
    "villa maría del triunfo": ["nueva esperanza", "tablada de lurin"],
    "ate": ["huaycán", "cerro colorado", "salamanca", "santa clara"],
    "callao": ["bellavista", "la perla", "ventanilla", "ciudad del pescador"]
}


class Inmueble(BaseModel):
    id: int
    direccion: Optional[str]
    tipo: Optional[str]
    precio: Optional[float]
    servicios: Optional[str]
    latitud: Optional[float]
    longitud: Optional[float]
    descripcion: Optional[str]

class ComparacionRequest(BaseModel):
    texto_usuario: str
    inmuebles: List[Inmueble]


def detectar_zona(texto_usuario):
    texto_usuario = texto_usuario.lower()
    todas_las_zonas = list(ZONAS_LIMA.keys()) + sum(ZONAS_LIMA.values(), [])
    mejor_match = process.extractOne(
        texto_usuario, todas_las_zonas, scorer=fuzz.token_set_ratio, score_cutoff=75
    )
    if mejor_match:
        for distrito, subzonas in ZONAS_LIMA.items():
            if mejor_match[0] == distrito:
                return distrito, mejor_match[0]
            if mejor_match[0] in subzonas:
                return distrito, mejor_match[0]
    return None, None


def obtener_coordenadas(zona):
    try:
        loc = geolocator.geocode(f"{zona}, Lima, Perú", timeout=10)
        return (loc.latitude, loc.longitude) if loc else None
    except:
        return None

def puntaje_por_distancia(km):
    if km < 1: return 5
    elif km < 3: return 4
    elif km < 5: return 3
    elif km < 10: return 2
    elif km < 15: return 1
    return 0

def evaluar_similitud(texto_usuario, inmuebles, embeddings_inmuebles):
    embedding_usuario = obtener_embedding(texto_usuario)
    zona_principal, subzona = detectar_zona(texto_usuario)
    tipo_detectado = detectar_tipo(texto_usuario)
    servicios_detectados = detectar_servicios(texto_usuario)
    precio_max = detectar_precio_maximo(texto_usuario)

    resultados = []

    for i, inmueble in enumerate(inmuebles):
        s = cosine_similarity([embedding_usuario], [embeddings_inmuebles[i]])[0][0]

        detalles = {
            "modo": "fallback_embeddings",
            "similitud": round(s, 4),
            "distancia_km": None,
            "puntaje_ubicacion": 0,
            "puntaje_tipo": 0,
            "puntaje_servicios": 0,
            "puntaje_precio": 0,
            "zona_detectada": None,
            "distrito_detectado": None,
            "servicios_detectados": []
        }

        direccion_normalizada = (inmueble.direccion or "").lower()

        # Evaluar ubicación solo si coincide realmente
        if zona_principal and zona_principal.lower() in direccion_normalizada:
            detalles["distrito_detectado"] = zona_principal
        if subzona and subzona.lower() in direccion_normalizada:
            detalles["zona_detectada"] = subzona

        resultados.append((s, inmueble, detalles))

    resultados.sort(key=lambda x: x[0], reverse=True)
    return resultados

@app.post("/buscar")
def buscar(req: ComparacionRequest):
    resultados, modo = evaluar_similitud(req.texto_usuario, req.inmuebles)
    return {
        "modo": modo or "evaluacion_directa",
        "resultados": resultados
    }
