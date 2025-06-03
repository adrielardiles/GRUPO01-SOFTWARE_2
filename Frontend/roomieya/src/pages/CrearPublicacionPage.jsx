import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import {
  Button,
  Card,
  Spinner,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CrearPublicacionPage() {
  const [step, setStep] = useState(1);
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    arrendatario: "",
    precio: "",
    servicios: [],
    serviciosExtra: "",
    referenciasExtra: "",
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(API.properties.list, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setProperties(res.data))
    .catch(err => {
      console.error("Error al obtener inmuebles:", err);
      alert("Error al cargar inmuebles. Verifica autenticación.");
    });
  }, [token]);

  const handleConfirm = () => {
    // Validaciones obligatorias
    if (!formData.arrendatario.trim()) {
      alert("El nombre del arrendatario es obligatorio");
      return;
    }
    if (!formData.precio || isNaN(formData.precio)) {
      alert("El precio mensual es obligatorio y debe ser un número");
      return;
    }
    if (formData.servicios.length === 0) {
      alert("Selecciona al menos un servicio incluido");
      return;
    }
    if (!selectedProperty?.id) {
      alert("Debes seleccionar un inmueble");
      return;
    }

    setLoading(true);
    axios.post(API.PublicacionesTR.create, {
      ...formData,
      inmuebleId: selectedProperty.id,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setConfirmado(true);
      setStep(2);
    })
    .catch(err => {
      console.error("Error al crear publicación:", err.response?.data || err.message);
      alert("Ocurrió un error al crear la publicación");
    })
    .finally(() => setLoading(false));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Crear nueva publicación</h2>

        {step === 1 && (
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            <h4 className="text-center mb-4">Completa los datos de tu publicación</h4>
            <Row className="g-4">
              <Col md={6}>
                <label className="form-label">👤 Nombre del arrendatario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Juan Pérez"
                  value={formData.arrendatario}
                  onChange={(e) => setFormData({ ...formData, arrendatario: e.target.value })}
                  required
                />
              </Col>

              <Col md={6}>
                <label className="form-label">💸 Precio mensual (PEN)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1200"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  required
                />
              </Col>

              <Col md={6}>
                <label className="form-label">📦 Servicios incluidos</label>
                <div className="d-flex flex-wrap gap-2">
                  {["WiFi", "Agua", "Luz", "Gas"].map(servicio => (
                    <div className="form-check" key={servicio}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={servicio}
                        checked={formData.servicios.includes(servicio)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.servicios, servicio]
                            : formData.servicios.filter(s => s !== servicio);
                          setFormData({ ...formData, servicios: updated });
                        }}
                      />
                      <label className="form-check-label ms-1" htmlFor={servicio}>
                        {servicio}
                      </label>
                    </div>
                  ))}
                </div>
              </Col>

              <Col md={6}>
                <label className="form-label">🏠 Selecciona un inmueble</label>
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
                <div className="mt-2">
                  <Button variant="link" size="sm" onClick={() => navigate("/registrar-inmueble")}>
                    Registrar nuevo espacio
                  </Button>
                </div>
              </Col>

              <Col md={6}>
                <label className="form-label">🎁 Servicios extra</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Ej. Netflix, lavandería, estacionamiento..."
                  value={formData.serviciosExtra}
                  onChange={(e) => setFormData({ ...formData, serviciosExtra: e.target.value })}
                />
              </Col>

              <Col md={6}>
                <label className="form-label">📍 Referencias extra</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Ej. Zona tranquila, cerca del metro..."
                  value={formData.referenciasExtra}
                  onChange={(e) => setFormData({ ...formData, referenciasExtra: e.target.value })}
                />
              </Col>

              <Col xs={12} className="text-center mt-4">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="px-5"
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Confirmar y publicar"}
                </Button>
              </Col>
            </Row>
          </div>
        )}

        {step === 2 && confirmado && (
          <Container className="mt-4">
            <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
              <h4 className="text-center mb-4">Resumen de la publicación</h4>
              <p><strong>Arrendatario:</strong> {formData.arrendatario}</p>
              <p><strong>Precio mensual:</strong> S/.{formData.precio}</p>
              <p><strong>Servicios incluidos:</strong> {formData.servicios.join(", ") || "Ninguno"}</p>
              <p><strong>Servicios extra:</strong> {formData.serviciosExtra || "N/A"}</p>
              <p><strong>Referencias extra:</strong> {formData.referenciasExtra || "N/A"}</p>
              <p><strong>Inmueble:</strong> {selectedProperty?.nombre || selectedProperty?.ubicacion}</p>

              <div className="text-center mt-4 d-flex justify-content-center gap-3">
                <Button variant="success" onClick={() => navigate("/")}>
                  Finalizar
                </Button>
                <Button variant="primary" onClick={() => navigate("/publicaciones")}>
                  Ver publicaciones
                </Button>
              </div>
            </Card>
          </Container>
        )}
      </Card>
    </Container>
  );
}
