import React, { useState } from 'react';
import { Box, Button, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Alert } from '@mui/material';
import { API } from '../api/votacionesApi';

export default function VotarForm({ votacion, usuarioId, onVotado }) {
  const [opcionId, setOpcionId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setError(false);
    if (!opcionId) {
      setMensaje('Selecciona una opción para votar.');
      setError(true);
      return;
    }
    try {
      await API.votaciones.votar(votacion.id, { usuarioId, opcionId: Number(opcionId) });
      setMensaje('¡Voto registrado con éxito!');
      setError(false);
      if(onVotado) onVotado();
    } catch (err) {
      setMensaje(err.response?.data || 'Error al registrar el voto.');
      setError(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>{votacion.pregunta}</Typography>
      <FormControl component="fieldset" sx={{ my: 2 }}>
        <RadioGroup value={opcionId} onChange={e => setOpcionId(e.target.value)}>
          {votacion.opciones.map(op => (
            <FormControlLabel key={op.id} value={op.id.toString()} control={<Radio />} label={op.descripcion} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" type="submit">Votar</Button>
      {mensaje && <Alert severity={error ? 'error' : 'success'} sx={{ mt: 2 }}>{mensaje}</Alert>}
    </Box>
  );
}
