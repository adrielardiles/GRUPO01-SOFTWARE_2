import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import {
  Button,
  Card,
  Spinner,
  Alert,
  Container,
  Row,
  Col
} from "react-bootstrap";
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
    } else if (step >= 2) {
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
    axios.post(API.announcements.create, {
      ...selectedTemplate,
      propertyId: selectedProperty?.id,
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

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Crear nueva publicación</h2>

        {/* Paso 1: Selección de plantilla */}
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
                        setStep(3);
                      }}>
                        Seleccionar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Paso 2: Completa los datos */}
        {step === 3 && (
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
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Precio mensual (PEN)</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedTemplate.precio || ""}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, precio: e.target.value })
                  }
                  placeholder="Ej. 1200"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Servicios incluidos</label>
                <div className="form-check">
                  {["WiFi", "Agua", "Luz", "Gas"].map((servicio) => (
                    <div key={servicio}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={servicio}
                        checked={selectedTemplate.servicios?.includes(servicio) || false}
                        onChange={(e) => {
                          const selected = selectedTemplate.servicios || [];
                          const updated = e.target.checked
                            ? [...selected, servicio]
                            : selected.filter((s) => s !== servicio);
                          setSelectedTemplate({
                            ...selectedTemplate,
                            servicios: updated,
                          });
                        }}
                      />
                      <label className="form-check-label ms-1" htmlFor={servicio}>
                        {servicio}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTemplate?.titulo === "Roomie Premium" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Servicios extra</label>
                    <textarea
                      className="form-control"
                      placeholder="Ej. Netflix, lavandería, estacionamiento..."
                      rows="2"
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
                      placeholder="Ej. Zona tranquila, cerca del metro..."
                      rows="2"
                      value={selectedTemplate.referenciasExtra || ""}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, referenciasExtra: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Selecciona un inmueble</label>
                <select
                  className="form-select"
                  value={selectedProperty?.id || ""}
                  onChange={(e) => {
                    const inmuebleSeleccionado = properties.find(p => p.id == e.target.value);
                    setSelectedProperty(inmuebleSeleccionado);
                  }}
                >
                  <option value="">-- Selecciona --</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre || p.ubicacion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <Button variant="link" onClick={() => navigate("/registrar-inmueble")}>
                  Registrar nuevo espacio
                </Button>
              </div>
            </div>

            <Button
              variant="success"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Confirmar y publicar"}
            </Button>
          </div>
        )}

        {/* Paso 3: Resumen final */}
        {step === 4 && confirmado && (
          <Container className="mt-4">
            <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
              <h4 className="text-center mb-4">Resumen de la publicación</h4>
              <p><strong>Plantilla:</strong> {selectedTemplate?.titulo}</p>
              <p><strong>Nombre del arrendatario:</strong> {selectedTemplate?.arrendatario}</p>
              <p><strong>Precio mensual:</strong> S/.{selectedTemplate?.precio}</p>
              <p><strong>Servicios incluidos:</strong> {selectedTemplate?.servicios?.join(", ") || "Ninguno"}</p>

              {selectedTemplate?.titulo === "Roomie Premium" && (
                <>
                  <p><strong>Servicios extra:</strong> {selectedTemplate?.serviciosExtra || "N/A"}</p>
                  <p><strong>Referencias extra:</strong> {selectedTemplate?.referenciasExtra || "N/A"}</p>
                </>
              )}

              <p><strong>Inmueble:</strong> {selectedProperty?.nombre || selectedProperty?.ubicacion}</p>

              <div className="text-center mt-4">
                <Button
                  variant="success"
                  onClick={() => {
                    alert("🎉 Tu publicación fue registrada exitosamente");
                    navigate("/");
                  }}
                >
                  Finalizar
                </Button>
              </div>
            </Card>
          </Container>
        )}
      </Card>
    </Container>
  );
}
