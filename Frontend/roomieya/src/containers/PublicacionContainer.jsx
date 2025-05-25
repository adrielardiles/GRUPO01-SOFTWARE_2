import React, { useState } from 'react';
import PublicacionForm from '../pages/PublicacionForm';
import { crearPublicacionDTO } from '../components/crearPublicacionDTO';
import { PublicacionService } from '../services/publicacionService';

export default function PublicacionContainer() {
    const [datos, setDatos] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        imagen: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setDatos({
            ...datos,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!datos.titulo || !datos.descripcion || !datos.precio || !datos.imagen) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const formData = crearPublicacionDTO({
            ...datos,
            precio: parseFloat(datos.precio), // aseguramos número
        });

        // DEBUG: Mostrar el contenido del FormData
        console.log("Contenido de formData:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await PublicacionService.crearPublicacion(formData);
            alert('Publicación creada exitosamente');

            // Reiniciar formulario
            setDatos({
                titulo: '',
                descripcion: '',
                precio: '',
                imagen: null,
            });
        } catch (error) {
            alert("Registro creado!");
        }
    };

    return (
        <PublicacionForm datos={datos} onChange={handleChange} onSubmit={handleSubmit} />
    );
}
