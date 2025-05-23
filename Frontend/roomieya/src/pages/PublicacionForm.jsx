import React from 'react';
import '../styles/PublicacionForm.css'
export default function PublicacionForm({ datos, onChange, onSubmit }) {
    return (
        <form  className="formulario-publicacion"  onSubmit={onSubmit}>
            <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={datos.titulo}
                onChange={onChange}
                required
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={datos.descripcion}
                onChange={onChange}
                required
            />
            <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={datos.precio}
                onChange={onChange}
                required
            />
            <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={onChange}
                required
            />
            <button type="submit">Publicar</button>
        </form>
    );
}
