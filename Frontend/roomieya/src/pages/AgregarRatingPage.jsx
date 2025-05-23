import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const AgregarRatingPage = () => {
  const [formulario, setFormulario] = useState({
    reviewerName: "",
    comment: "",
    score: "",
    userId: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3080/api/ratings", formulario);
      setMensaje("¡Rating registrado correctamente!");
      setError("");
      setTimeout(() => navigate("/ratings"), 2000);
    } catch (err) {
      setError("Error al registrar el rating.");
      setMensaje("");
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Registrar Calificación</Card.Title>
          {mensaje && <Alert variant="success">{mensaje}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del evaluador</Form.Label>
              <Form.Control
                type="text"
                name="reviewerName"
                value={formulario.reviewerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={formulario.comment}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Puntuación (1 a 5)</Form.Label>
              <Form.Control
                type="number"
                name="score"
                value={formulario.score}
                min={1}
                max={5}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID del arrendatario calificado</Form.Label>
              <Form.Control
                type="number"
                name="userId"
                value={formulario.userId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrar Rating
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AgregarRatingPage;
