import React from 'react';
import '../styles/PublicacionForm.css';

export default function PublicacionForm({ datos, onChange, onSubmit }) {
  return (
    <form className="form-container" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          name="titulo"
          placeholder="Título"
          value={datos.titulo}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción"
          value={datos.descripcion}
          onChange={onChange}
          rows={4}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          name="precio"
          placeholder="Precio"
          value={datos.precio}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="imagen">Imagen</label>
        <input
          id="imagen"
          type="file"
          name="imagen"
          accept="image/*"
          onChange={onChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Publicar
      </button>
    </form>
  );
}
