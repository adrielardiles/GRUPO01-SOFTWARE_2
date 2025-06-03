// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/RegisterForm';


const RegisterPage = () => {
  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div className="container mt-5">
        <h2 className="mb-4 text-center text-dark">Crear cuenta</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
