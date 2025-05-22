// src/services/api.js
export const guardarReglaDisponibilidad = async (datos) => {
    const response = await fetch("http://localhost:8080/api/reglas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        throw new Error("Error guardando la regla");
    }

    return response.json();
};
