// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GrupoEspecificoContainer from './components/grupos/GrupoEspecificoContainer';



import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas existentes
import LandingPage from './pages/LadingPage';
import RegisterPage from './pages/RegisterPage';

// Tus páginas de pagos
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

import AnunciosPage from './pages/AnunciosPage';
import Header from './components/Header';
import PantallaGrupos from './pages/PantallaGrupos';

// REGISTRAR INMUEBLEPAGE
import RegistrarInmueblePage from './pages/RegistrarInmueblePage';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/* Rutas ya existentes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas añadidas para módulo de pagos */}
        <Route path="/pago" element={<PaymentPage />} />
        <Route path="/historial" element={<PaymentHistoryPage />} />
        <Route path="/grupos" element={<PantallaGrupos />} />

        <Route path="/anuncios" element={<AnunciosPage />} />
        <Route path="/grupo/:groupId" element={<GrupoEspecificoContainer />} />


{/* Rutas añadida para registrar inmueble */}
        <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;