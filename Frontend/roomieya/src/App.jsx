// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas existentes
import LandingPage from './pages/LadingPage';
import RegisterPage from './pages/RegisterPage';

// Tus páginas de pagos
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

const App = () => {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f8f9fa', marginBottom: '1rem' }}>
        <a href="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>Inicio</a>
        <a href="/register" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>Registro</a>
        <a href="/pago" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>Realizar Pago</a>
        <a href="/historial" style={{ textDecoration: 'none', color: '#007bff' }}>Historial</a>
      </nav>

      <Routes>
        {/* Rutas ya existentes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas añadidas para módulo de pagos */}
        <Route path="/pago" element={<PaymentPage />} />
        <Route path="/historial" element={<PaymentHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;