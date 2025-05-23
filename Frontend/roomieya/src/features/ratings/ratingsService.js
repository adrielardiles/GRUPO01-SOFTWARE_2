export async function fetchRatings(role = "landlord") {
  const res = await fetch(`/api/ratings/${role}`);
  if (!res.ok) throw new Error("Error al obtener calificaciones");
  return res.json();
}