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

  useEffect(() => {
    if (step === 1) {
      setTemplates([
        { id: 1, titulo: "Roomie Express", descripcion: "Habitación y servicios básicos" },
        { id: 2, titulo: "Roomie Premium", descripcion: "Ofrezco servicios y/o espacios extra" },
      ]);
    } else if (step >= 2) {
      axios.get(API.properties.list)
        .then(res => {
          if (Array.isArray(res.data)) {
            setProperties(res.data);
          } else {
            console.warn("Respuesta inesperada:", res.data);
            setProperties([]);
          }
        })
        .catch(() => {
          alert("Error al cargar inmuebles. Verifica autenticación.");
          setProperties([]);
        });
    }
  }, [step]);

  const handleConfirm = () => {
    setLoading(true);

    axios.post(API.plantillas.create, {
      titulo: selectedTemplate?.titulo,
      arrendatario: selectedTemplate?.arrendatario,
      precio: selectedTemplate?.precio,
      servicios: (selectedTemplate?.servicios || []).join(", "),
      serviciosExtra: selectedTemplate?.serviciosExtra || "",
      referenciasExtra: selectedTemplate?.referenciasExtra || "",
      inmuebleId: selectedProperty?.id || null,
    })
    .then(() => {
      setConfirmado(true);
      setStep(4);
    })
    .catch(() => alert("Ocurrió un error al registrar la plantilla"))
    .finally(() => setLoading(false));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Crear nueva publicación</h2>

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

        {step === 2 && (
          <div className="text-center">
            <h5 className="mb-4">Paso 2: Completa los datos</h5>
            <p><strong>Plantilla:</strong> {selectedTemplate?.titulo}</p>

            <div className="mb-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
              <div className="mb-3">
                <label className="form-label">Nombre del arrendatario</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedTemplate.arrendatario || ""}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, arrendatario: e.target.value })
                  }
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Precio mensual</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedTemplate.precio || ""}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, precio: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Servicios incluidos</label>
                {["WiFi", "Agua", "Luz", "Gas"].map(servicio => (
                  <div key={servicio}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedTemplate.servicios?.includes(servicio) || false}
                      onChange={(e) => {
                        const serviciosActuales = selectedTemplate.servicios || [];
                        const nuevosServicios = e.target.checked
                          ? [...serviciosActuales, servicio]
                          : serviciosActuales.filter(s => s !== servicio);
                        setSelectedTemplate({ ...selectedTemplate, servicios: nuevosServicios });
                      }}
                    />
                    <label className="form-check-label ms-1">{servicio}</label>
                  </div>
                ))}
              </div>

              {selectedTemplate?.titulo === "Roomie Premium" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Servicios extra</label>
                    <textarea
                      className="form-control"
                      value={selectedTemplate.serviciosExtra || ""}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, serviciosExtra: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Referencias extra</label>
                    <textarea
                      className="form-control"
                      value={selectedTemplate.referenciasExtra || ""}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, referenciasExtra: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Selecciona un inmueble (opcional)</label>
                <select
                  className="form-select"
                  value={selectedProperty?.id || ""}
                  onChange={(e) => {
                    const prop = properties.find(p => p.id === parseInt(e.target.value));
                    setSelectedProperty(prop);
                  }}
                >
                  <option value="">-- Ninguno --</option>
                  {Array.isArray(properties) && properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre || p.ubicacion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button variant="success" onClick={handleConfirm} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Confirmar y registrar"}
            </Button>
          </div>
        )}

        {step === 4 && confirmado && (
          <Container className="mt-4">
            <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
              <h4 className="text-center mb-4">Resumen</h4>
              <p><strong>Plantilla:</strong> {selectedTemplate?.titulo}</p>
              <p><strong>Arrendatario:</strong> {selectedTemplate?.arrendatario}</p>
              <p><strong>Precio:</strong> {selectedTemplate?.precio}</p>
              <p><strong>Servicios:</strong> {selectedTemplate?.servicios?.join(", ") || "Ninguno"}</p>
              {selectedTemplate?.titulo === "Roomie Premium" && (
                <>
                  <p><strong>Servicios extra:</strong> {selectedTemplate?.serviciosExtra}</p>
                  <p><strong>Referencias extra:</strong> {selectedTemplate?.referenciasExtra}</p>
                </>
              )}
              <p><strong>Inmueble ID:</strong> {selectedProperty?.id || "Ninguno"}</p>
              <div className="text-center mt-4">
                <Button variant="primary" onClick={() => navigate("/")}>Volver al inicio</Button>
              </div>
            </Card>
          </Container>
        )}
      </Card>
    </Container>
  );
}
