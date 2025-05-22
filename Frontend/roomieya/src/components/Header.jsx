import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const botones = [
    { texto: 'ANUNCIOS', ruta: '/anuncios' },
    { texto: 'PAGO', ruta: '/pago' },
    { texto: 'HISTORIAL', ruta: '/historial' },
    { texto: 'CREAR PUBLICACION', ruta: '/crear-publicacion' },
    { texto: 'ZONA 2', ruta: '/zona2' },
    { texto: 'ZONA 3', ruta: '/zona3' },
  ];

  return (
  <>
    {/* Layout personalizado con logo centrado y botones debajo */}
    <div className="w-100 d-flex flex-column align-items-center py-3 px-2">
      {/* Logo centrado */}
      <div className="mb-3">
        <img
          src="/logo/logo.png"
          alt="Logo RoomieYa"
          style={{ height: '90px' }}
        />
      </div>

      <div className="header-layout">
        {/* Ícono avatar */}
        <div
          className="icono-avatar"
          onClick={() => navigate('/register')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4H21.6v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>

        {/* Botones dinámicos */}
        <div className="botonera">
          {[
            { texto: 'ANUNCIOS', ruta: '/anuncios' },
            { texto: 'PAGO', ruta: '/pago' },
            { texto: 'HISTORIAL', ruta: '/historial' },
            { texto: 'CREAR PUBLICACION', ruta: '/crear-publicacion' },
            { texto: 'ZONA 2', ruta: '/zona2' },
            { texto: 'ZONA 3', ruta: '/zona3' },
            { texto: 'RESEÑAS', ruta: '/admin/reported-reviews' }
          ].map(({ texto, ruta }, idx) => (
            <button
              key={idx}
              className="custom-btn"
              onClick={() => navigate(ruta)}
            >
              {texto}
            </button>
          ))}
        </div>

        {/* Ícono casa */}
        <div
          className="icono-casa"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
      </div>
    </div>

    {/* Estilos personalizados */}
    <style>{`
      .header-layout {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        max-width: 1100px;
        width: 100%;
      }

      .icono-avatar, .icono-casa {
        width: 48px;
        height: 48px;
        background-color: #F05941;
        border-radius: 50%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .botonera {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.2rem;
        flex: 1;
      }

      .custom-btn {
        background-color: #F05941;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 1.5rem;
        width: 120px;
        padding: 0.35rem 0;
        font-size: 0.85rem;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease-in-out;
        text-align: center;
      }

      .custom-btn:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
    `}</style>
  </>
);


};

export default Header;
