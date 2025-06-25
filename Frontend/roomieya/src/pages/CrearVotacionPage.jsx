// File: src/pages/CrearVotacionPage.jsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, IconButton, Paper, Alert } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { API } from '../api/votacionesApi';
import { useNavigate } from 'react-router-dom';

export default function CrearVotacionPage() {
  const [pregunta, setPregunta] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [opciones, setOpciones] = useState(['', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOpcionChange = (index, value) => {
    const nuevas = [...opciones];
    nuevas[index] = value;
    setOpciones(nuevas);
  };

  const agregarOpcion = () => setOpciones([...opciones, '']);
  const removerOpcion = (idx) => setOpciones(opciones.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!pregunta || !fechaInicio || !fechaFin || opciones.some(o => !o.trim())) {
      setError('Completa todos los campos y opciones.');
      return;
    }
    try {
      await API.votaciones.crear({
        pregunta,
        fechaInicio,
        fechaFin,
        opciones: opciones.map(desc => ({ descripcion: desc }))
      });
      navigate('/votaciones');
    } catch (err) {
      // Mostrar solo el mensaje de error del backend
      const msg = err.response?.data?.message || 'Error al crear votación.';
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Nueva Votación
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Pregunta"
            value={pregunta}
            onChange={e => setPregunta(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Fecha Inicio"
            type="datetime-local"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Fecha Fin"
            type="datetime-local"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Opciones de votación
          </Typography>

          {opciones.map((op, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label={`Opción ${idx + 1}`}
                value={op}
                onChange={e => handleOpcionChange(idx, e.target.value)}
                fullWidth
                required
              />
              <IconButton
                onClick={() => removerOpcion(idx)}
                disabled={opciones.length <= 2}
              >
                <RemoveCircle />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddCircle />}
            onClick={agregarOpcion}
            sx={{ mb: 2 }}
          >
            Agregar opción
          </Button>

          <Button type="submit" variant="contained" fullWidth>
            Crear Votación
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
