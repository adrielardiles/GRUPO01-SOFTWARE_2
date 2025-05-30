// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MisInmueblesPage from './pages/MisInmueblesPage';

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

import EditarInmueblePage from './pages/EditarInmueblePage';


import RegistroEspacioPage from './pages/RegistroEspacioPage';
// registrar disponibilidad de alquiler
import './containers/PublicacionContainer'
import './pages/PublicacionForm'
import PublicacionContainer from "./containers/PublicacionContainer";
import RatingsPage from './features/ratings/RatingsPage';
import RatingsReceivedPage from './pages/RatingsReceivedPage';
import AgregarRatingPage from './pages/AgregarRatingPage';
import RenterProfilePage from './pages/RenterProfilePage';
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

        <Route path="/reseñas" element={<ReportedReviews />} />

        <Route path="/ratings" element={<RatingsPage />} />

        {/* Calificacion de Arrendador*/}
        <Route path="/ratings-received" element={<RatingsReceivedPage />} />
        {/* Agregar Rating*/}
        <Route path="/agregar-rating" element={<AgregarRatingPage />} />
        {/* Calificación de Arrendatario*/}
        <Route path= "/renter/:userId" element={<RenterProfilePage />} />
        {/* Programa Citas*/}
        <Route path= "/Citas" element={<CitasPage />} />

        {/* Rutas registrarInmueblePAge*/}
          <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />
          <Route path="/editar-inmueble/:id" element={<EditarInmueblePage />} />

          {/* Rutas añadidas para disponibilidad de alquiler*/}
          <Route path="/PublicacionContainer" element={<PublicacionContainer />} />
{/* Rutas registrarInmueblePAge*/}
        <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />


{/* Rutas MisInmuebles*/}
      <Route path="/mis-inmuebles" element={<MisInmueblesPage />} />         
       {/* Rutas añadidas para disponibilidad de alquiler*/}          
      <Route path="/PublicacionContainer" element={<PublicacionContainer />} />
        <Route path="/reseñas" element={<ReportedReviews />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
