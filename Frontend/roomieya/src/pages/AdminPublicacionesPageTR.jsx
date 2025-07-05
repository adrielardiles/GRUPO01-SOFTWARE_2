import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPublicacionesPageTR() {
  const [publicaciones, setPublicaciones] = useState([]);

  const cargarPublicaciones = () => {
    axios.get("http://localhost:8081/api/publicaciones-tr")
      .then(res => setPublicaciones(res.data))
      .catch(err => console.error("Error al cargar publicaciones", err));
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const actualizarEstado = (id, nuevoEstado, motivo = null) => {
    axios.put(`http://localhost:8081/api/publicaciones-tr/${id}/estado`, null, {
      params: {
        estado: nuevoEstado,
        ...(motivo && { motivo })
      }
    })
    .then(() => cargarPublicaciones())
    .catch(err => {
      console.error("Error al actualizar estado:", err);
      alert("❌ Error al actualizar estado.");
    });
  };

  const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #ddd",
    color: "#555"
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    color: "#333"
  };

  const btnBase = {
    border: "none",
    padding: "6px 12px",
    marginRight: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  };

  const btnGreen = {
    ...btnBase,
    backgroundColor: "#4CAF50",
    color: "white"
  };

  const btnRed = {
    ...btnBase,
    backgroundColor: "#f44336",
    color: "white"
  };

  const btnGray = {
    ...btnBase,
    backgroundColor: "#555",
    color: "white"
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>🧾 Publicaciones Registradas</h2>

      {publicaciones.length === 0 ? (
        <p style={{ color: "#888" }}>No hay publicaciones registradas.</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Arrendatario</th>
              <th style={thStyle}>Referencias</th>
              <th style={thStyle}>Precio (S/.)</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Motivo de Rechazo</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.map((pub, index) => (
              <tr key={pub.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={tdStyle}>{pub.id}</td>
                <td style={tdStyle}>{pub.arrendatario}</td>
                <td style={tdStyle}>{pub.referenciasExtra || "-"}</td>
                <td style={tdStyle}>{pub.precio}</td>
                <td style={tdStyle}>{pub.estado?.toLowerCase() || "pendiente"}</td>
                <td style={tdStyle}>{pub.motivoRechazo || "-"}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => actualizarEstado(pub.id, "APROBADO")}
                    style={btnGreen}
                    disabled={pub.estado === "APROBADO"}
                  >✅</button>
                  <button
                    onClick={() => {
                      const motivo = prompt("Ingrese el motivo del rechazo:");
                      if (motivo && motivo.trim() !== "") {
                        actualizarEstado(pub.id, "RECHAZADO", motivo);
                      }
                    }}
                    style={btnRed}
                    disabled={pub.estado === "RECHAZADO"}
                  >❌</button>
                  <button
                    onClick={() => {
                      const motivo = prompt("¿Motivo de eliminación?");
                      if (motivo && motivo.trim() !== "" && window.confirm("¿Seguro que deseas eliminar esta publicación?")) {
                        actualizarEstado(pub.id, "ELIMINADO", motivo);
                      }
                    }}
                    style={btnGray}
                    disabled={pub.estado === "ELIMINADO"}
                  >🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
