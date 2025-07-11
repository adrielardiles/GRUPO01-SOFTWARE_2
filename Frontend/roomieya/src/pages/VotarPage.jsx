import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VotarForm from '../components/VotarForm';
import { Container, CircularProgress, Typography, Button, Box } from '@mui/material';
import { API } from '../api/votacionesApi';

export default function VotarPage() {
  const { id } = useParams();
  const [votacion, setVotacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votado, setVotado] = useState(false);
  const navigate = useNavigate();

  // ✅ Obtiene usuarioId de localStorage (o JWT decodificado si tienes uno)
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const checkVotoYTraerVotacion = async () => {
      try {
        // 1️⃣ Verifica si ya votó
        const res = await API.votaciones.votado(id, usuarioId);
        if (res.data.votado) {
          // Si ya votó, redirige a resultados
          navigate(`/votaciones/${id}/resultados`);
        } else {
          // 2️⃣ Si NO votó, trae la votación
          const votacionRes = await API.votaciones.getById(id);
          setVotacion(votacionRes.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    checkVotoYTraerVotacion();
  }, [id, usuarioId, navigate]);

  if (loading) return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <CircularProgress />
    </Container>
  );

  if (!votacion) return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography>No se encontró la votación.</Typography>
    </Container>
  );

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      {!votado ? (
        <VotarForm
          votacion={votacion}
          usuarioId={usuarioId}
          onVotado={() => setVotado(true)}
        />
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" color="success.main">
            ¡Gracias por tu voto!
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate(`/votaciones/${votacion.id}/resultados`)}
          >
            Ver resultados
          </Button>
        </Box>
      )}
    </Container>
  );
}
