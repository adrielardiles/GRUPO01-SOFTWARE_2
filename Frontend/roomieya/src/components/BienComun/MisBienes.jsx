import React, { useState } from 'react';
import useBienes from '../../hooks/useBienes';
import '../../styles/Tabla.css'; // Asegúrate de tener un archivo CSS para estilos

const MisBienes = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const { bienes, loading, error, editBien, deleteBien } = useBienes(usuarioId);  // Desestructuramos las funciones del hook
  const [editando, setEditando] = useState(null);  // Para gestionar la edición del estado
  const [mensajeError, setMensajeError] = useState('');  // Para mostrar error
  const [mensajeExito, setMensajeExito] = useState('');  // Para mostrar éxito
  const [nuevoEstado, setNuevoEstado] = useState('');  // Estado para gestionar el nuevo estado de edición

  // Función para editar el estado del bien
  const handleEdit = async (id, nuevoEstado) => {
    const result = await editBien(id, nuevoEstado);
    if (result) {
        setMensajeExito('Bien editado correctamente.');
        setMensajeError('');
        setEditando(null); // Cierra la edición después de editar
    } else {
        setMensajeExito('');
        setMensajeError('Error al editar el bien.');
    }
  };

  // Función para eliminar un bien
  const handleDelete = async (id) => {
    const result = await deleteBien(id);
    if (result) {
        setMensajeExito('Bien eliminado correctamente.');
        setMensajeError('');
    } else {
        setMensajeExito('');
        setMensajeError('Error al eliminar el bien.');
    }
};


  const handleSelectChange = (id, value) => {
    setNuevoEstado(value);  // Actualizamos el estado local para el nuevo valor
    handleEdit(id, value);  // Llamamos a handleEdit para actualizar el backend
  };

  if (loading) return <p>Cargando bienes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mis-bienes-container">
      <h2>Mis Bienes Comunes</h2>

      {/* Mostrar mensaje de éxito o error */}
      {mensajeExito && <p className="success-message">{mensajeExito}</p>}
      {mensajeError && <p className="error-message">{mensajeError}</p>}

      <div className="bienes-lista">
        {bienes.length > 0 ? (
          bienes.map((bien) => (
            <div key={bien.id} className="bien-item">
              <p><strong>Nombre:</strong> {bien.nombre}</p>
              <p><strong>Descripción:</strong> {bien.descripcion}</p>
              <p><strong>Estado:</strong>
                {editando === bien.id ? (
                  <select
                    value={editando === bien.id ? nuevoEstado : bien.estado}
  // Usamos el estado local o el valor original
                    onChange={(e) => handleSelectChange(bien.id, e.target.value)}
                  >
                    <option value="EN_USO">En uso</option>
                    <option value="EN_REPARACION">En reparación</option>
                    <option value="DISPONIBLE">Disponible</option>
                  </select>
                ) : (
                  bien.estado
                )}
              </p>
              <div className="botones">
                <button
  className="btn-editar"
  onClick={() => {
    setEditando(bien.id);
    setNuevoEstado(bien.estado);  // Inicializa el nuevo estado con el actual
  }}
>
  Editar
</button>
                <button className="btn-eliminar" onClick={() => handleDelete(bien.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes bienes comunes registrados.</p>
        )}
      </div>
    </div>
  );
};

export default MisBienes;
