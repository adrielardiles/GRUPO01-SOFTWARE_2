// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MisInmueblesPage from './pages/MisInmueblesPage';
import LandingPage from './pages/LadingPage';
import RegisterPage from './pages/RegisterPage';
import ReportedReviews from './components/ReportedReviews';
import CrearPublicacionPage from './pages/CrearPublicacionPage';
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import PublicacionesCreadasPage from './pages/PublicacionesCreadasPage';
import FormularioGastoCompartido from './components/FormularioGastoCompartido';
import AnunciosPage from './pages/AnunciosPage';
import Header from './components/Header';
import RegistrarInmueblePage from './pages/RegistrarInmueblePage';
import EditarInmueblePage from './pages/EditarInmueblePage';
import RegistroEspacioPage from './pages/RegistroEspacioPage';
import PublicacionContainer from './containers/PublicacionContainer';
import RatingsPage from './features/ratings/RatingsPage';
import RatingsReceivedPage from './pages/RatingsReceivedPage';
import AgregarRatingPage from './pages/AgregarRatingPage';
import RenterProfilePage from './pages/RenterProfilePage';
import CitasPage from './pages/CitasPage';
import TinderLike from './pages/presentacioninmuebles';
import InventoryPage from './pages/InventoryPage';
import CrearReglaPage from './pages/CrearReglaPage';
import ReglasPendientesPage from './pages/ReglasPendientesPage';
import ListaNotificaciones from './components/ListaNotificaciones';
import CrearVotacionPage from './pages/CrearVotacionPage';
import AdminPublicacionesPageTR from './pages/AdminPublicacionesPageTR'
import AccountLogin from './components/AccountLogin';
import AccountEdit from './components/AccountEdit';
import PasswordRecovery from './components/PasswordRecovery';


import { Outlet } from 'react-router-dom';


// Votaciones imports
import { API } from './api/votacionesApi';
import VotarPage from './pages/VotarPage';
import ResultadosVotacionPage from './pages/ResultadosVotacionPage';

// Componente para listar votaciones
function ListaVotaciones() {
  const [lista, setLista] = useState([]);
  useEffect(() => {
    API.votaciones.activas().then(res => setLista(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Votaciones Activas</h2>

      {/* ← Aquí */}
      <Link to="/votaciones/crear" className="btn btn-primary mb-3">
        Crear nueva votación
      </Link>

      <ul className="list-group">
        {lista.map(v => (
          <li key={v.id} className="list-group-item">
            <Link to={`/votaciones/${v.id}`}>{v.pregunta}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LayoutConHeader = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing and Auth */}
        <Route path="/" element={<AccountLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/recuperar" element={<PasswordRecovery />} />
        <Route path="/editar-cuenta" element={<AccountEdit />} />

        {/* Si el usuario ya está logueado, verá el Header aquí */}
        <Route path="/home" element={<Header />} />

        <Route element={<LayoutConHeader />}>
          {/* Propiedades */}
          <Route path="/mis-inmuebles" element={<MisInmueblesPage />} />
          <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />
          <Route path="/editar-inmueble/:id" element={<EditarInmueblePage />} />

          {/* Publicaciones */}
          <Route path="/publicaciones" element={<PublicacionesCreadasPage />} />
          <Route path="/crear-publicacion" element={<CrearPublicacionPage />} />
          <Route path="/registro-espacio" element={<RegistroEspacioPage />} />
          <Route path="/PublicacionContainer" element={<PublicacionContainer />} />
          <Route path="/adminContainer" element={<AdminPublicacionesPageTR />} />


          {/* Reseñas y Ratings */}
          <Route path="/reseñas" element={<ReportedReviews />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/ratings-received" element={<RatingsReceivedPage />} />
          <Route path="/agregar-rating" element={<AgregarRatingPage />} />
          <Route path="/renter/:userId" element={<RenterProfilePage />} />

          {/* Citas */}
          <Route path="/citas" element={<CitasPage />} />

          {/* Tinder Like y Inventory */}
          <Route path="/inmueble-presentacion" element={<TinderLike />} />
          <Route path="/registrar-bienes" element={<InventoryPage />} />

          {/* Reglas */}
          <Route path="/crear-regla" element={<CrearReglaPage />} />
          <Route path="/reglas-pendientes" element={<ReglasPendientesPage />} />

          {/* Pagos */}
          <Route path="/pago" element={<PaymentPage />} />
          <Route path="/historial" element={<PaymentHistoryPage />} />

          {/* Anuncios y Gastos Compartidos */}
          <Route path="/anuncios" element={<AnunciosPage />} />
          <Route path="/gastos-compartidos" element={<FormularioGastoCompartido />} />
          <Route path="/notificaciones" element={<ListaNotificaciones />} />

          {/* Votaciones */}
          <Route path="/votaciones" element={<ListaVotaciones />} />
          <Route path="/votaciones/crear" element={<CrearVotacionPage />} />
          <Route path="/votaciones/:id" element={<VotarPage />} />
          <Route path="/votaciones/:id/resultados" element={<ResultadosVotacionPage />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
