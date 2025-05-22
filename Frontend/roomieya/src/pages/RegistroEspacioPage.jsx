import { useState } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import { Form, Button, Container, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RegistrarInmueblePage() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    capacidad: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    axios.post(API.properties.create, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setMensaje({ tipo: "success", texto: "Inmueble registrado correctamente 🎉" });
      setTimeout(() => navigate("/crear-publicacion"), 1500);
    })
    .catch(err => {
      console.error(err);
      setMensaje({ tipo: "danger", texto: "Error al registrar inmueble." });
    })
    .finally(() => setLoading(false));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Registrar nuevo inmueble</h3>

        {mensaje && (
          <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre del inmueble</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ej. Departamento Roma Norte"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUbicacion">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              placeholder="Ej. Calle Falsa 123, CDMX"
              value={form.ubicacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={3}
              placeholder="Describe brevemente el espacio..."
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formCapacidad">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              min="1"
              placeholder="Cantidad de personas"
              value={form.capacidad}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Registrar Inmueble"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
