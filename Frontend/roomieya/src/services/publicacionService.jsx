const API_URL = 'http://localhost:8080/api';

export const PublicacionService = {
    async crearPublicacion(formData) {
        const response = await fetch(`${API_URL}/publicaciones`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Error al crear publicación');
        return response.json();
    },

    async listarPublicaciones() {
        const response = await fetch(`${API_URL}/publicaciones`);
        if (!response.ok) throw new Error('Error al obtener publicaciones');
        return response.json();
    },
};
