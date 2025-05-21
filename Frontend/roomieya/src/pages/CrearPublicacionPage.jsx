import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/endpoints";
import { Button, Card, Spinner, Alert } from "react-bootstrap";

export default function CrearPublicacionPage() {
  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // Paso 1: obtener plantillas (simuladas por ahora)
  useEffect(() => {
    if (step === 1) {
      // Simular plantillas localmente por ahora (puedes conectarlo luego)
      setTemplates([
        { id: 1, titulo: "Plantilla A", descripcion: "Habitación amueblada con WiFi" },
        { id: 2, titulo: "Plantilla B", descripcion: "Cerca de universidad, incluye servicios" },
      ]);
    } else if (step === 2) {
      axios.get(API.properties.list).then(res => setProperties(res.data));
    }
  }, [step]);

  const handleConfirm = () => {
    setLoading(true);
    axios
      .post(API.announcements.create, {
        ...selectedTemplate,
        propertyId: selectedProperty.id,
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
      <Alert variant="success" className="mt-4 text-center">
        🎉 Tu publicación se ha creado exitosamente.
      </Alert>
    );

  return (
    <div className="container mt-4">
      <h2>Crear nueva publicación</h2>

      {step === 1 && (
        <>
          <h5 className="mt-3">Paso 1: Selecciona una plantilla</h5>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {templates.map(template => (
              <Card key={template.id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{template.titulo}</Card.Title>
                  <Card.Text>{template.descripcion}</Card.Text>
                  <Button onClick={() => {
                    setSelectedTemplate(template);
                    setStep(2);
                  }}>Seleccionar</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h5 className="mt-3">Paso 2: Selecciona un inmueble</h5>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {properties.map(prop => (
              <Card key={prop.id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{prop.ubicacion || prop.nombre}</Card.Title>
                  <Card.Text>{prop.descripcion}</Card.Text>
                  <Button onClick={() => {
                    setSelectedProperty(prop);
                    setStep(3);
                  }}>Seleccionar</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <div className="text-center mt-5">
          <h5>Confirmar publicación</h5>
          <p><strong>Plantilla:</strong> {selectedTemplate?.titulo}</p>
          <p><strong>Inmueble:</strong> {selectedProperty?.ubicacion || selectedProperty?.nombre}</p>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Confirmar y publicar"}
          </Button>
        </div>
      )}
    </div>
  );
}
