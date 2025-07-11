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
  const usuarioId = 5; // simulado

  useEffect(() => {
  API.votaciones.votado(id, usuarioId)
      .then(res => {
        if(res.data.votado){
        navigate(`/votaciones/${id}/resultados`);
        }else{
        const v = res.data.find(v => v.id === Number(id));
        setVotacion(v);
        setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Container sx={{ textAlign:'center', mt:8 }}><CircularProgress/></Container>;
  if (!votacion) return <Container sx={{ textAlign:'center', mt:8 }}><Typography>No se encontró la votación.</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ my:4 }}>
      {!votado ? (
        <VotarForm votacion={votacion} usuarioId={usuarioId} onVotado={() => setVotado(true)} />
      ) : (
        <Box sx={{ textAlign:'center', mt:4 }}>
          <Typography variant="h5" color="success.main">¡Gracias por tu voto!</Typography>
          <Button variant="contained" sx={{ mt:3 }} onClick={() => navigate(`/votaciones/${votacion.id}/resultados`)}>
            Ver resultados
          </Button>
        </Box>
      )}
    </Container>
  );
}