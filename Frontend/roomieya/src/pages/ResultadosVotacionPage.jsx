import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ResultadosVotacion from '../components/ResultadosVotacion';
import { Container, Button, Typography } from '@mui/material';

export default function ResultadosVotacionPage() {
  const { id } = useParams();
  const [trigger, setTrigger] = useState(0);

  return (
    <Container maxWidth="sm" sx={{ my:4 }}>
      <Typography variant="h4" gutterBottom>Resultados de votación</Typography>
      <Button variant="contained" onClick={() => setTrigger(t => t+1)} sx={{ mb:2 }}>
        Recargar
      </Button>
      <ResultadosVotacion votacionId={id} trigger={trigger} />
      <Button component={Link} to="/votaciones" variant="outlined" sx={{ mt:3 }}>
        Volver a votaciones
      </Button>
    </Container>
  );
}