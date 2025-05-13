// src/api/endpoints.js
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
  }
  // Agrega más módulos aquí según crezca el sistema
};
