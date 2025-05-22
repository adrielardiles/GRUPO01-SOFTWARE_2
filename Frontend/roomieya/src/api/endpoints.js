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

  plantillas: {
  create: `${BASE_URL}/api/plantillas`,
  list: `${BASE_URL}/api/plantillas`
  },

  payments: {
    make: `${BASE_URL}/payments/make`,
    history: `${BASE_URL}/payments/history`
  },

  announcements: {
    propertiesByUser: `${BASE_URL}/announcements/properties-by-user`,
    byProperty: (propertyId, page = 1) =>
      `${BASE_URL}/announcements/by-property/${propertyId}?page=${page}&size=5`,
    detail: (announcementId) =>
      `${BASE_URL}/announcements/detail/${announcementId}`,
    markAsRead: (announcementId) =>
      `${BASE_URL}/announcements/mark-as-read/${announcementId}`,
    create: `${BASE_URL}/announcements/create`
  },

  groups: {
    create: `${BASE_URL}/groups/create`,
    myGroups: `${BASE_URL}/groups/my`,
    searchById: (groupId) => `${BASE_URL}/groups/search/${groupId}`,
    joinRequest: (groupId) => `${BASE_URL}/groups/join/${groupId}`,
    joinPublic: (groupId) => `${BASE_URL}/groups/join-public/${groupId}`,
    groupDetail: (groupId) => `${BASE_URL}/groups/${groupId}`,
    updateGroup: (groupId) => `${BASE_URL}/groups/${groupId}/update`,
    members: (groupId) => `${BASE_URL}/groups/${groupId}/members`,
    acceptMember: (groupId, userId) =>
      `${BASE_URL}/groups/${groupId}/members/${userId}/accept`,
    rejectMember: (groupId, userId) =>
      `${BASE_URL}/groups/${groupId}/members/${userId}/reject`,
    removeMember: (groupId, userId) =>
      `${BASE_URL}/groups/${groupId}/members/${userId}/remove`
  },

  groupChat: {
    messages: (groupId) => `${BASE_URL}/group-chat/${groupId}/messages`,
    sendMessage: (groupId) => `${BASE_URL}/group-chat/${groupId}/send`,
    affinityTypes: `${BASE_URL}/groups/types`
  }
};
