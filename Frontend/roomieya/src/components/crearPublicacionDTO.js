export function crearPublicacionDTO(datos) {
  const formData = new FormData();
  formData.append("titulo", datos.titulo);
  formData.append("descripcion", datos.descripcion);
  formData.append("precio", datos.precio); // ya llega como número
  formData.append("imagen", datos.imagen); // debe ser File
  return formData;
}
