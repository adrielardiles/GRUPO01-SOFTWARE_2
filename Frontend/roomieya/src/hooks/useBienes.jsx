import { useEffect, useState } from 'react';
import axios from 'axios';

const useBienes = (usuarioId) => {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBienes = async () => {
      try {
        console.log('🎯 Llamando API con usuarioId:', usuarioId);
        const res = await axios.get('http://localhost:8081/api/bienes/mis-bienes', {
          params: { usuarioId },
        });
        console.log('✅ Bienes recibidos:', res.data);
        setBienes(res.data);
      } catch (err) {
        console.error('❌ Error obteniendo bienes:', err);
        setError('Error cargando bienes.');
      } finally {
        setLoading(false); // ¡Esto siempre se debe ejecutar!
      }
    };

    if (usuarioId) {
      fetchBienes();
    } else {
      setLoading(false); // por si no hay usuarioId
    }
  }, [usuarioId]);

  // Función para editar un bien
  const editBien = async (id, nuevoEstado) => {
    try {
       await axios.put(`http://localhost:8081/api/bienes/${id}`, {
            estado: nuevoEstado,
        });
        setBienes(prevBienes => prevBienes.map(bien =>
            bien.id === id ? { ...bien, estado: nuevoEstado } : bien
        ));
        return true;
    } catch (error) {
        console.error('Error al editar el bien:', error);
        return false;
    }

};


   // Función para eliminar un bien
  const deleteBien = async (id) => {
    try {
        await axios.delete(`http://localhost:8081/api/bienes/${id}`);
        setBienes(prevBienes => prevBienes.filter(bien => bien.id !== id));
        return true;  // Confirmamos que la eliminación fue exitosa
    } catch (error) {
        console.error('Error al eliminar el bien:', error);
        return false;  // Si ocurre un error, retornamos falso
    }
};


  return { bienes, loading, error, deleteBien, editBien};
};

export default useBienes;
