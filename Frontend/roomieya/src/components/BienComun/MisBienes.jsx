import React from 'react';
import useBienes from '../../hooks/useBienes';

const MisBienes = () => {
  const usuarioId = localStorage.getItem('usuarioId'); // asegúrate de que exista en el localStorage
  const { bienes, loading, error } = useBienes(usuarioId);

  if (loading) return <p>Cargando bienes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mis Bienes Comunes</h2>
      <ul>
        {bienes.length > 0 ? (
          bienes.map((bien) => (
            <li key={bien.id}>
              <p><strong>Nombre:</strong> {bien.nombre}</p>
              <p><strong>Descripción:</strong> {bien.descripcion}</p>
              <p><strong>Estado:</strong> {bien.estado}</p>
            </li>
          ))
        ) : (
          <p>No tienes bienes comunes registrados.</p>
        )}
      </ul>
    </div>
  );
};

export default MisBienes;
