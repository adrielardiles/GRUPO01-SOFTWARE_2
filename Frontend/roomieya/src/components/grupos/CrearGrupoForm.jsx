// src/components/grupos/CrearGrupoForm.jsx
import React from 'react';

const CrearGrupoForm = ({ formData, onChange, onSubmit, tiposDisponibles }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del grupo</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          value={formData.descripcion}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Visibilidad</label>
        <select
          name="visibilidad"
          className="form-select"
          value={formData.visibilidad}
          onChange={onChange}
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de grupo</label>
        <select
          name="afinidad"
          className="form-select"
          value={formData.afinidad}
          onChange={onChange}
          required
        >
          <option value="">Selecciona un tipo...</option>
          {tiposDisponibles.map((tipo, idx) => (
            <option key={idx} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary">Crear grupo</button>
      </div>
    </form>
  );
};

export default CrearGrupoForm;
