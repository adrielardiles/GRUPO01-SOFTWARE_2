// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas existentes
import LandingPage from './pages/LadingPage';
import RegisterPage from './pages/RegisterPage';
import ReportedReviews from './components/ReportedReviews';
import CrearPublicacionPage from './pages/CrearPublicacionPage';
// Tus páginas de pagos
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

import AnunciosPage from './pages/AnunciosPage';
import Header from './components/Header';
// registrarinmueblepage
import RegistrarInmueblePage from './pages/RegistrarInmueblePage';

import RegistroEspacioPage from './pages/RegistroEspacioPage';
// registrar disponibilidad de alquiler
import './containers/PublicacionContainer'
import './pages/PublicacionForm'
import PublicacionContainer from "./containers/PublicacionContainer";
import RatingsPage from './features/ratings/RatingsPage';


// MisInmuebles
import MisInmueblesPage from './pages/MisInmueblesPage';

// EditarInmueble
import EditarInmueblePage from './pages/EditarInmueblePage';

//Reservar citas para visitar inmuebles
import CitasPage from './pages/CitasPage';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Rutas ya existentes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas añadidas para módulo de pagos */}
        <Route path="/pago" element={<PaymentPage />} />
        <Route path="/historial" element={<PaymentHistoryPage />} />
        <Route path="/anuncios" element={<AnunciosPage />} />
        
        <Route path="/crear-publicacion" element={<CrearPublicacionPage />} />
        <Route path="/registro-espacio" element={<RegistroEspacioPage />} />


        {/* Rutas registrarInmueblePAge*/}
        <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />

{/* Rutas MisInmuebles*/}
        <Route path="/mis-inmuebles" element={<MisInmueblesPage />} />
          {/* Rutas añadidas para disponibilidad de alquiler*/}
          <Route path="/PublicacionContainer" element={<PublicacionContainer />} />
          {/*Reservar citas para inmuebles*/}
          <Route path="/citas" element={<CitasPage />} />

        <Route path="/ratings" element={<RatingsPage />} />
<Route path="/reseñas" element={<ReportedReviews />} />
        {/* Rutas EditarInmueble*/}
        <Route path="/editar-inmueble/:id" element={<EditarInmueblePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
