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

  return { bienes, loading, error };
};

export default useBienes;
