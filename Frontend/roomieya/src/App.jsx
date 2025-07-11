import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { API } from './api/votacionesApi';
// Páginas
import ListaNotificaciones from './components/ListaNotificaciones';
import CrearVotacionPage from './pages/CrearVotacionPage';
import AdminPublicacionesPage from './pages/AdminPublicacionesPageTR';
import RegisterPage from './pages/RegisterPage';
import PublicacionesCreadasPage from './pages/PublicacionesCreadasPage';
import CrearPublicacionPage from './pages/CrearPublicacionPage';
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import AnunciosPage from './pages/AnunciosPage';
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
import MisInmueblesPage from './pages/MisInmueblesPage';
import VotarPage from './pages/VotarPage';
import ResultadosVotacionPage from './pages/ResultadosVotacionPage';
import GastosPage from './pages/GastosPage';
import ReseñasPage from './pages/ReseñasPage';
import AccountLogin from './components/AccountLogin';
import PasswordRecovery from './components/PasswordRecovery';
import AccountEdit from './components/AccountEdit';
import { Outlet } from 'react-router-dom';
// Header con notificaciones
import Header from './components/Header';
import MisBienesPage from './pages/MisBienesPage'; // Página para ver los bienes comunes
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
        <Route path="/" element={<AccountLogin />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar" element={<PasswordRecovery />} />
        <Route path="/home" element={<Header />} />

        <Route element={<LayoutConHeader />}>
          <Route path="/editar-cuenta" element={< AccountEdit/>} />
          <Route path="/publicaciones" element={<PublicacionesCreadasPage />} />
        <Route path="/publicaciones-admin" element={<AdminPublicacionesPage />} />
          <Route path="/crear-publicacion" element={<CrearPublicacionPage />} />  
          <Route path="/pago" element={<PaymentPage />} />
          <Route path="/historial" element={<PaymentHistoryPage />} />
          <Route path="/anuncios" element={<AnunciosPage />} />
          <Route path="/registro-espacio" element={<RegistroEspacioPage />} />
          <Route path="/reseñas" element={<ReseñasPage />} /> {/* ✅ Ruta activa */}
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/ratings-received" element={<RatingsReceivedPage />} />
          <Route path="/agregar-rating" element={<AgregarRatingPage />} />
          <Route path="/renter-profile" element={<RenterProfilePage />} />
          <Route path="/citas/:id" element={<CitasPage />} />
          <Route path="/gastos" element={<GastosPage />} /> {/* ✅ Gastos compartidos */}
          <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />
          <Route path="/editar-inmueble/:id" element={<EditarInmueblePage />} />
          <Route path="/publicacionContainer" element={<PublicacionContainer />} />
          <Route path="/mis-inmuebles" element={<MisInmueblesPage />} />
          <Route path="/inmueble-presentacion" element={<TinderLike />} />
          <Route path="/crear-regla" element={<CrearReglaPage />} />
          <Route path="/reglas-pendientes" element={<ReglasPendientesPage />} />
          <Route path="/registrar-bienes" element={<InventoryPage />} /> {/* ✅ Ruta para registrar bienes */}
          <Route path="/mis-bienes" element={<MisBienesPage />} /> {/* ✅ Ruta para ver los bienes */}
          <Route path="/votaciones" element={<ListaVotaciones />} />
          <Route path="/votaciones/crear" element={<CrearVotacionPage />} />
          <Route path="/votaciones/:id" element={<VotarPage />} />
          <Route path="/votaciones/:id/resultados" element={<ResultadosVotacionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
