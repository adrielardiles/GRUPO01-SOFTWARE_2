import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import {
  Container,
  Card,
  Spinner,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

export default function PublicacionesCreadasPage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API.PublicacionesTR.list, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPublicaciones(res.data))
      .catch((err) => {
        console.error("Error al cargar publicaciones:", err);
        alert("No se pudieron obtener las publicaciones.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Container className="mt-5 mb-5 px-4">
      <h2 className="text-center mb-4">📋 Publicaciones registradas</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : publicaciones.length === 0 ? (
        <p className="text-center">No hay publicaciones registradas.</p>
      ) : (
        <Row className="g-4">
          {publicaciones.map((publi) => (
            <Col xs={12} md={6} lg={4} key={publi.id}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="text-primary">{publi.arrendatario}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <strong>Precio:</strong> S/.{publi.precio}
                    </Card.Subtitle>
                    <p><strong>Inmueble:</strong> {publi.nombreInmueble || publi.ubicacion || "No registrado"}</p>
                    <p><strong>Servicios:</strong> {publi.servicios?.join(", ") || "Ninguno"}</p>
                    {publi.serviciosExtra && (
                      <p><strong>Extra:</strong> {publi.serviciosExtra}</p>
                    )}
                    {publi.referenciasExtra && (
                      <p><strong>Referencias:</strong> {publi.referenciasExtra}</p>
                    )}
                  </div>

                  <div className="text-end mt-3">
                    <Badge bg="success">Activa</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
