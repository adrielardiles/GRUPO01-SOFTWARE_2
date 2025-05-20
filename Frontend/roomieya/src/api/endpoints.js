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
  }

};
