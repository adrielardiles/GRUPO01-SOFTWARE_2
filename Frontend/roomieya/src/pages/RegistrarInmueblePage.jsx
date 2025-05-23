import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api/endpoints";

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
    try {
      await axios.post(API.properties.create, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExito(true);
      setTimeout(() => navigate("/crear-publicacion"), 2000);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el inmueble. Verifica los datos.");
    }
  };

  return (
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
  );
}
