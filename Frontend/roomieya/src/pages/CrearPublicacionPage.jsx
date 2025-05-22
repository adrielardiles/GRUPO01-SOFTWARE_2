import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import { Button, Card, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CrearPublicacionPage() {
  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (step === 1) {
      setTemplates([
        { id: 1, titulo: "Roomie Express", descripcion: "Habitación y servicios básicos" },
        { id: 2, titulo: "Roomie Premium", descripcion: "Ofrezco servicios y/o espacios extra" },
      ]);
    } else if (step === 2) {
      axios.get(API.properties.list, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProperties(res.data))
      .catch(err => {
        console.error("Error al obtener inmuebles:", err);
        alert("Error al cargar inmuebles. Verifica autenticación.");
      });
    }
  }, [step, token]);

  const handleConfirm = () => {
    setLoading(true);
    axios
      .post(API.announcements.create, {
        ...selectedTemplate,
        propertyId: selectedProperty.id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setConfirmado(true);
        setStep(4);
      })
      .catch(err => {
        console.error("Error al crear publicación:", err);
        alert("Ocurrió un error al crear la publicación");
      })
      .finally(() => setLoading(false));
  };

  if (step === 4 && confirmado)
    return (
      <Container className="mt-5 text-center">
        <Alert variant="success">
          🎉 Tu publicación se ha creado exitosamente.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Crear nueva publicación</h2>

        {/* Paso 1 - Plantillas */}
        {step === 1 && (
          <>
            <h5 className="mb-3 text-center">Paso 1: Selecciona una plantilla</h5>
            <Row className="justify-content-center g-3">
              {templates.map(template => (
                <Col xs={12} md={6} lg={4} key={template.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{template.titulo}</Card.Title>
                      <Card.Text>{template.descripcion}</Card.Text>
                      <Button variant="outline-primary" onClick={() => {
                        setSelectedTemplate(template);
                        setStep(2);
                      }}>Seleccionar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Paso 2 - Inmuebles */}
        {step === 2 && (
          <>
            <h5 className="mb-3 text-center">Paso 2: Selecciona un inmueble</h5>
            {properties.length === 0 ? (
              <Alert variant="warning" className="text-center">
                No tienes inmuebles registrados.{" "}
                <Button variant="link" onClick={() => navigate("/registro-espacio")}>
                  Registrar uno ahora
                </Button>
              </Alert>
            ) : (
              <Row className="justify-content-center g-3">
                {properties.map(prop => (
                  <Col xs={12} md={6} lg={4} key={prop.id}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title>{prop.ubicacion || prop.nombre}</Card.Title>
                        <Card.Text>
                          {prop.descripcion || "Sin descripción"}<br />
                          <strong>Capacidad:</strong> {prop.capacidad || "No definida"}
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {
                          setSelectedProperty(prop);
                          setStep(3);
                        }}>Seleccionar</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}

        {/* Paso 3 - Confirmación */}
        {step === 3 && (
          <div className="text-center">
            <h5 className="mb-3">Paso 3: Confirmar publicación</h5>
            <p><strong>Plantilla:</strong> {selectedTemplate?.titulo}</p>
            <p><strong>Inmueble:</strong> {selectedProperty?.ubicacion || selectedProperty?.nombre}</p>
            <Button
              variant="success"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Confirmar y publicar"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
