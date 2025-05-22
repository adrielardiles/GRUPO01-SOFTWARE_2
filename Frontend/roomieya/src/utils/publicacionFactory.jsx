export function crearPublicacionDTO({ titulo, descripcion, precio, imagen }) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('imagen', imagen);
    return formData;
}
