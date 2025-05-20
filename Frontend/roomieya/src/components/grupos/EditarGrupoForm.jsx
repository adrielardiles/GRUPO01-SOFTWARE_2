// src/components/grupos/EditarGrupoForm.jsx
import React from 'react';

const EditarGrupoForm = ({ formData, onChange, onSubmit }) => {
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
        <label className="form-label">Tipo de grupo (afinidad)</label>
        <input
          type="text"
          name="afinidad"
          className="form-control"
          value={formData.afinidad}
          onChange={onChange}
          required
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Guardar cambios</button>
      </div>
    </form>
  );
};

export default EditarGrupoForm;
