import React from 'react';
import '../styles/PublicacionForm.css';


export default function PublicacionForm({ datos, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={datos.titulo}
          onChange={onChange}
          pattern=".{3,50}"
          title="El título debe tener entre 3 y 50 caracteres"
          required
          placeholder="Ejemplo: Apartamento céntrico"
        />
      </div>

      <div className="form-field">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={datos.descripcion}
          onChange={onChange}
          pattern=".{10,300}"
          title="La descripción debe tener entre 10 y 300 caracteres"
          required
          placeholder="Descripción detallada de la publicación"
          rows="4"
        />
      </div>

      <div className="form-field">
        <label htmlFor="precio">Precio (S/):</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={datos.precio}
          onChange={onChange}
          min="0"
          step="0.01"
          required
          placeholder="Ejemplo: 1200.00"
        />
      </div>

      <div className="form-field">
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          name="imagen"
          onChange={onChange}
          accept="image/*"
          required
        />
      </div>

      <button type="submit" className="submit-button">Crear Publicación</button>
    </form>
  );
}
