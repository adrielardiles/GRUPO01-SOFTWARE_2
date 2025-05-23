<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
=======
import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api/endpoints";
>>>>>>> c94f6f4d8a15ba99690cc9ca9e8f642a1e09e2f2

export default function RegistrarInmueblePage() {
  const [form, setForm] = useState({
    tipo: "",
    ubicacion: "",
    tamano: "",
    precio: "",
    servicios: "",
    descripcion: "",
    privado: true,
  });

<<<<<<< HEAD
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();
=======
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
>>>>>>> c94f6f4d8a15ba99690cc9ca9e8f642a1e09e2f2

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

<<<<<<< HEAD
  const validar = () => {
    const newErrors = {};
    if (!formData.tipo) newErrors.tipo = 'Seleccione un tipo de inmueble';
    if (!formData.ubicacion || formData.ubicacion.length < 3)
      newErrors.ubicacion = 'Ubicación muy corta (mínimo 3 caracteres)';
    if (!formData.tamano || Number(formData.tamano) <= 0)
      newErrors.tamano = 'El tamaño debe ser mayor a 0';
    if (!formData.precio || Number(formData.precio) <= 0)
      newErrors.precio = 'El precio debe ser mayor a 0';
    if (formData.servicios && formData.servicios.length < 5)
      newErrors.servicios = 'Especifique mejor los servicios (mínimo 5 caracteres)';
    if (!formData.descripcion || formData.descripcion.length < 10)
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      try {
        const response = await axios.post('http://localhost:8080/api/inmuebles', formData);
        alert('Inmueble registrado correctamente');
        navigate('/mis-inmuebles');
      } catch (error) {
        console.error('Error al registrar inmueble:', error);
        alert('Error al registrar, inténtalo de nuevo');
      }
    } else {
      console.log('Errores de validación:', errores);
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(API.properties.create, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExito(true);
      setTimeout(() => navigate("/crear-publicacion"), 2000);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el inmueble. Verifica los datos.");
>>>>>>> c94f6f4d8a15ba99690cc9ca9e8f642a1e09e2f2
    }
  };

  return (
<<<<<<< HEAD
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h1>Registrar Inmueble</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Tipo de inmueble</label>
          <select
            className={`form-select ${errores.tipo ? 'is-invalid' : ''}`}
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Departamento">Departamento</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Casa">Casa</option>
          </select>
          {errores.tipo && <div className="invalid-feedback">{errores.tipo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className={`form-control ${errores.ubicacion ? 'is-invalid' : ''}`}
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
          {errores.ubicacion && <div className="invalid-feedback">{errores.ubicacion}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tamaño (m²)</label>
          <input
            type="number"
            className={`form-control ${errores.tamano ? 'is-invalid' : ''}`}
            name="tamano"
            value={formData.tamano}
            onChange={handleChange}
          />
          {errores.tamano && <div className="invalid-feedback">{errores.tamano}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Precio mensual (S/)</label>
          <input
            type="number"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Servicios incluidos</label>
          <input
            type="text"
            className={`form-control ${errores.servicios ? 'is-invalid' : ''}`}
            name="servicios"
            value={formData.servicios}
            onChange={handleChange}
          />
          {errores.servicios && <div className="invalid-feedback">{errores.servicios}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Registrar inmueble</button>
      </form>
    </div>
=======
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
>>>>>>> c94f6f4d8a15ba99690cc9ca9e8f642a1e09e2f2
  );
}
