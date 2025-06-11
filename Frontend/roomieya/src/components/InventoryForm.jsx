import React from 'react';
import '../styles/inventoryForm.css';

const InventoryForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>Nombre del Bien:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={onChange}
        required
      />
    </div>

    <div>
      <label>Cantidad:</label>
      <input
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={onChange}
        required
        min="1"
      />
    </div>

    <div>
      <label>Estado:</label>
      <select
        name="estado"
        value={formData.estado}
        onChange={onChange}
        required
      >
        <option value="">Selecciona un estado</option>
        <option value="Bueno">Bueno</option>
        <option value="Regular">Regular</option>
        <option value="Malo">Malo</option>
      </select>
    </div>

    <div>
      <label>Observaciones:</label>
      <textarea
        name="observaciones"
        value={formData.observaciones}
        onChange={onChange}
      />
    </div>

    <button type="submit">Registrar Bien</button>
  </form>
);

export default InventoryForm;
