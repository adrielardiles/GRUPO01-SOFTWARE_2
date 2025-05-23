<<<<<<< HEAD
import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api/endpoints";
=======
// src/pages/RegistrarInmueblePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
>>>>>>> 74afc70 (Mi avance antes de sincronizar)

const RegistrarInmueblePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    ubicacion: '',
    tamano: '',
    precio: '',
    servicios: '',
    descripcion: ''
  });
  const [error, setError] = useState('');

<<<<<<< HEAD
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
=======
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
>>>>>>> 74afc70 (Mi avance antes de sincronizar)
    try {
      await axios.post('http://localhost:8080/api/inmuebles', formData);
      navigate('/mis-inmuebles');
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError("No se pudo registrar el inmueble. Verifica los datos.");
=======
      setError('Error al registrar, inténtalo de nuevo');
>>>>>>> 74afc70 (Mi avance antes de sincronizar)
    }
  };

  return (
<<<<<<< HEAD
    <Container className="mt-5">
      <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Registrar Inmueble</h3>

        {exito && <Alert variant="success">✅ Inmueble registrado con éxito</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Ej. Departamento, Habitación"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              placeholder="Dirección o zona"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tamaño (m²)</Form.Label>
            <Form.Control
              type="number"
              name="tamano"
              value={form.tamano}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio mensual (S/)</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Servicios (separados por coma)</Form.Label>
            <Form.Control
              type="text"
              name="servicios"
              value={form.servicios}
              onChange={handleChange}
              placeholder="Ej. WiFi, agua, luz"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={3}
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Detalles del espacio"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="privado"
              checked={form.privado}
              onChange={handleChange}
              label="¿Es privado?"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Registrar Inmueble
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
=======
    <div className="container mt-5">
      <h1>Registrar Inmueble</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* DIRECCIÓN */}
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            name="direccion"
            type="text"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        {/* TIPO */}
        <div className="mb-3">
          <label className="form-label">Tipo de inmueble</label>
          <select
            name="tipo"
            className="form-select"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Departamento">Departamento</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Casa">Casa</option>
          </select>
        </div>

        {/* UBICACIÓN */}
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            name="ubicacion"
            type="text"
            className="form-control"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        {/* TAMAÑO */}
        <div className="mb-3">
          <label className="form-label">Tamaño (m²)</label>
          <input
            name="tamano"
            type="number"
            className="form-control"
            value={formData.tamano}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRECIO */}
        <div className="mb-3">
          <label className="form-label">Precio mensual (S/)</label>
          <input
            name="precio"
            type="number"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* SERVICIOS */}
        <div className="mb-3">
          <label className="form-label">Servicios incluidos</label>
          <input
            name="servicios"
            type="text"
            className="form-control"
            value={formData.servicios}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrar inmueble</button>
      </form>
    </div>
>>>>>>> 74afc70 (Mi avance antes de sincronizar)
  );
};

export default RegistrarInmueblePage;
