const BASE_URL = 'http://localhost:8081';

export const API = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    sendVerificationCode: `${BASE_URL}/auth/send-verification-code`,
    login: `${BASE_URL}/auth/login`,
    recover: `${BASE_URL}/auth/recover`
  },

  properties: {
    list: `${BASE_URL}/api/inmuebles`,
    create: `${BASE_URL}/api/inmuebles`
  },

  payments: {
    make: `${BASE_URL}/api/pagos/realizar`,
    history: `${BASE_URL}/api/pagos/usuario/1`
  },

  inmuebles: {
    listar: `${BASE_URL}/api/inmuebles`,
    buscar: `${BASE_URL}/api/inmuebles/buscar`,
    filtrar: `${BASE_URL}/api/inmuebles/filtrar`,
    like: `${BASE_URL}/api/inmuebles`, // considera cambiar a `/api/inmuebles/{id}/like` si lo usas así
    noLike: `${BASE_URL}/api/inmuebles`
  },

  // ✅ Endpoints de catálogos y filtros corregidos
  catalogos: {
    tipos: `${BASE_URL}/api/filtros/tipos`, // corregido
    provincias: `${BASE_URL}/api/filtros/provincias`, // corregido
    distritosPorProvincia: (provincia) => `${BASE_URL}/api/filtros/distritos?provincia=${provincia}`, // corregido
    caracteristicas: `${BASE_URL}/api/filtros/caracteristicas` // corregido
  },

  announcements: {
    historial: (anuncioId) => `${BASE_URL}/api/anuncios/historial/${anuncioId}`,
    propertiesByUser: `${BASE_URL}/api/anuncios/properties-by-user`,
    byProperty: (propertyId, page = 1, usuarioId) =>
      `${BASE_URL}/api/anuncios/by-property/${propertyId}?usuarioId=${usuarioId}&page=${page}&size=5`,
    detail: (announcementId, usuarioId) =>
      `${BASE_URL}/api/anuncios/detail/${announcementId}?usuarioId=${usuarioId}`,
    markAsRead: (announcementId, usuarioId) =>
      `${BASE_URL}/api/anuncios/mark-as-read/${announcementId}?usuarioId=${usuarioId}`,
    confirmUrgent: (announcementId, usuarioId) =>
      `${BASE_URL}/api/anuncios/confirmar-urgente/${announcementId}?usuarioId=${usuarioId}`,
    create: `${BASE_URL}/api/anuncios`,
    update: (announcementId) => `${BASE_URL}/api/anuncios/${announcementId}`,
    delete: (announcementId) => `${BASE_URL}/api/anuncios/${announcementId}`
  },

  PublicacionesTR: {
    list: `${BASE_URL}/api/publicaciones-tr`,
    create: `${BASE_URL}/api/publicaciones-tr`,
    filtrar: `${BASE_URL}/api/publicaciones-tr/filtrar` 
  },

  reglas: {
    guardar: `${BASE_URL}/api/reglas`
  }
};
