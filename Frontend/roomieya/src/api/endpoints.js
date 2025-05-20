const BASE_URL = 'https://api.roomieya.com';

export const API = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    sendVerificationCode: `${BASE_URL}/auth/send-verification-code`,
    login: `${BASE_URL}/auth/login`,
    recover: `${BASE_URL}/auth/recover`
  },
  properties: {
    list: `${BASE_URL}/properties`,
    create: `${BASE_URL}/properties/create`
  },
  payments: {
    make: `${BASE_URL}/payments/make`,
    history: `${BASE_URL}/payments/history`
  },
  announcements: {
    propertiesByUser: `${BASE_URL}/announcements/properties-by-user`,
    byProperty: (propertyId, page = 1) => `${BASE_URL}/announcements/by-property/${propertyId}?page=${page}&size=5`,
    detail: (announcementId) => `${BASE_URL}/announcements/detail/${announcementId}`,
    markAsRead: (announcementId) => `${BASE_URL}/announcements/mark-as-read/${announcementId}`,
    create: `${BASE_URL}/announcements/create`
  },

  groups: {
    create: `${BASE_URL}/groups/create`, // POST: crear nuevo grupo
    myGroups: `${BASE_URL}/groups/my`, // GET: grupos donde el usuario pertenece (o es dueño)
    searchById: (groupId) => `${BASE_URL}/groups/search/${groupId}`, // GET: buscar grupo por ID
    joinRequest: (groupId) => `${BASE_URL}/groups/join/${groupId}`, // POST: solicitar unión a grupo privado
    joinPublic: (groupId) => `${BASE_URL}/groups/join-public/${groupId}`, // POST: unirse directamente a grupo público
    groupDetail: (groupId) => `${BASE_URL}/groups/${groupId}`, // GET: obtener info general de un grupo
    updateGroup: (groupId) => `${BASE_URL}/groups/${groupId}/update`, // PUT: editar nombre, tipo, visibilidad (solo propietario)
    members: (groupId) => `${BASE_URL}/groups/${groupId}/members`, // GET: listar miembros (dividir en aceptados y pendientes)
    acceptMember: (groupId, userId) => `${BASE_URL}/groups/${groupId}/members/${userId}/accept`, // POST: aceptar solicitud
    rejectMember: (groupId, userId) => `${BASE_URL}/groups/${groupId}/members/${userId}/reject`, // POST: rechazar solicitud
    removeMember: (groupId, userId) => `${BASE_URL}/groups/${groupId}/members/${userId}/remove`, // DELETE: expulsar miembro
  },

  groupChat: {
    messages: (groupId) => `${BASE_URL}/group-chat/${groupId}/messages`, // GET: obtener mensajes
    sendMessage: (groupId) => `${BASE_URL}/group-chat/${groupId}/send`, // POST: enviar mensaje
    affinityTypes: `${BASE_URL}/groups/types`
  }





};
