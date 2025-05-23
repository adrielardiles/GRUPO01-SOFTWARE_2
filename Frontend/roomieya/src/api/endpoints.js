const BASE_URL = 'http://localhost:8080';

export const API = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    sendVerificationCode: `${BASE_URL}/auth/send-verification-code`,
    login: `${BASE_URL}/auth/login`,
    recover: `${BASE_URL}/auth/recover`
  },

  properties: {
    list: `${BASE_URL}/api/inmuebles`,     // GET: listar inmuebles
    create: `${BASE_URL}/api/inmuebles`    // POST: crear inmueble
  },

  payments: {
    make: `${BASE_URL}/payments/make`,
    history: `${BASE_URL}/payments/history`
  },
  
announcements: {
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
}



};
