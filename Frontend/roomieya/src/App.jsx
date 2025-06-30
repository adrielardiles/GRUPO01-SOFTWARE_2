import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas
import LandingPage from './pages/LadingPage';
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
import GastosPage from './pages/GastosPage';
import ReseñasPage from './pages/ReseñasPage'; 
import AccountLogin from './components/AccountLogin';
import PasswordRecovery from './components/PasswordRecovery';
import AccountEdit from './components/AccountEdit';
import { Outlet } from 'react-router-dom';
// Header con notificaciones
import Header from './components/Header'; 


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
          <Route path="/crear-publicacion" element={<CrearPublicacionPage />} />
          <Route path="/pago" element={<PaymentPage />} />
          <Route path="/historial" element={<PaymentHistoryPage />} />
          <Route path="/anuncios" element={<AnunciosPage />} />
          <Route path="/registro-espacio" element={<RegistroEspacioPage />} />
          <Route path="/reseñas" element={<ReseñasPage />} /> {/* ✅ Ruta activa */}
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/ratings-received" element={<RatingsReceivedPage />} />
          <Route path="/agregar-rating" element={<AgregarRatingPage />} />
          <Route path="/renter/:userId" element={<RenterProfilePage />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/gastos" element={<GastosPage />} /> {/* ✅ Gastos compartidos */}
          <Route path="/registrar-inmueble" element={<RegistrarInmueblePage />} />
          <Route path="/editar-inmueble/:id" element={<EditarInmueblePage />} />
          <Route path="/publicacionContainer" element={<PublicacionContainer />} />
          <Route path="/mis-inmuebles" element={<MisInmueblesPage />} />
          <Route path="/inmueble-presentacion" element={<TinderLike />} />
          <Route path="/crear-regla" element={<CrearReglaPage />} />
          <Route path="/reglas-pendientes" element={<ReglasPendientesPage />} />
          <Route path="/registrar-bienes" element={<InventoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
