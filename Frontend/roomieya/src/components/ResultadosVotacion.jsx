import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Stack, Paper, Alert } from '@mui/material';
import { API } from '../api/votacionesApi';

export default function ResultadosVotacion({ votacionId, trigger }) {
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!votacionId) return;
    API.votaciones.resultados(votacionId)
      .then(res => setResultados(res.data))
      .catch(() => setError('Error al cargar resultados'));
  }, [votacionId, trigger]);

  return (
    <Box sx={{ my:4, p:2, bgcolor:'white', borderRadius:2, boxShadow:1 }}>
      <Typography variant="h6" mb={2}>Resultados</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2}>
        {resultados.map(r => (
          <Paper key={r.descripcion} sx={{ p:2 }}>
            <Typography>{r.descripcion}</Typography>
            <LinearProgress variant="determinate" value={r.porcentaje} sx={{ height:10, borderRadius:5, my:1 }}/>
            <Typography variant="caption">{r.cantidadVotos} votos ({r.porcentaje.toFixed(2)}%)</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}