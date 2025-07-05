import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate();
  const [hayNotificaciones, setHayNotificaciones] = useState(false);

  // Verifica si hay notificaciones no leídas
  useEffect(() => {
    const verificarNotificaciones = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/notificaciones');
        const noLeidas = res.data.filter(n => !n.leida);
        setHayNotificaciones(noLeidas.length > 0);
      } catch (error) {
        console.error('Error al verificar notificaciones', error);
      }
    };
    verificarNotificaciones();
  }, []);

  const botones = [
    { texto: 'ANUNCIOS', ruta: '/anuncios' },
    { texto: 'PAGO', ruta: '/pago' },
    { texto: 'HISTORIAL', ruta: '/historial' },
    { texto: 'CREAR PUBLICACION', ruta: '/crear-publicacion' },
    { texto: 'ADMINISTRAR PUBLICACIONES', ruta: '/publicaciones-admin' },
    { texto: 'ZONA 3', ruta: '/zona3' },
    { texto: 'DISPONIBILIDAD DE ALQUILER', ruta: '/PublicacionContainer' },
    { texto: 'REGISTRAR RESEÑA', ruta: '/agregar-rating' },
    { texto: 'RESEÑAS', ruta: '/reseñas' },
    { texto: 'REGISTRAR INMUEBLE', ruta: '/registrar-inmueble' },
    { texto: 'REGISTRAR BIENES COMPARTIDOS', ruta: '/registrar-bienes' },
    { texto: 'MIS BIENES COMPARTIDOS', ruta: '/mis-bienes' }

  ];

  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center py-3 px-2">
        <div className="mb-3">
          <img
            src="/logo/logo.png"
            alt="Logo RoomieYa"
            style={{ height: '90px' }}
            onClick={() => navigate('/home')}
          />
        </div>

        <div className="header-layout">
          {/* Avatar con dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="none" className="icono-avatar p-0 border-0 bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4H21.6v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </Dropdown.Toggle>

        <Dropdown.Menu align="start">
          <Dropdown.Item onClick={() => navigate('/editar-cuenta')}>Editar cuenta</Dropdown.Item>
          <Dropdown.Divider />
          <button className="logout-button" onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}>
            Cerrar sesión
          </button>
        </Dropdown.Menu>
        </Dropdown>

          {/* Botones */}
          <div className="botonera">
            {botones.map(({ texto, ruta }, idx) => (
              <button
                key={idx}
                className="custom-btn"
                onClick={() => navigate(ruta)}
              >
                {texto}
              </button>
            ))}
          </div>

          {/* Icono de Casa */}
          <div className="icono-casa" onClick={() => navigate('/home')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>

          {/* 💰 Gasto Compartido */}
          <div
            className="icono-gastos"
            onClick={() => navigate('/gastos')}
            title="Gastos Compartidos"
          >
            💰
            {hayNotificaciones && <span className="badge-notificacion" />}
          </div>
        </div>
      </div>

      {/* Estilos */}
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

        .icono-avatar, .icono-casa, .icono-gastos {
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
          position: relative;
          font-size: 22px;
          color: white;
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
          width: 160px;
          padding: 0.4rem 0;
          font-size: 0.85rem;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease-in-out;
          text-align: center;
        }

        .custom-btn:hover {
          transform: scale(1.05);
          cursor: pointer;
        }

        .badge-notificacion {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          border: 2px solid white;
        }

        .dropdown-menu {
          border-radius: 1rem;
          box-shadow: 0 3px 8px rgba(0,0,0,0.15);
          padding: 0.5rem 0;
          background-color: #ffffff;
          min-width: 180px;
        }

        .dropdown-menu .dropdown-item {
          padding: 10px 20px;
          font-weight: 500;
          font-size: 0.95rem;
          color: #333;
          transition: background-color 0.2s ease;
        }

        .dropdown-menu .dropdown-item:hover {
          background-color: #F05941;
          color: #fff;
        }

        .dropdown-divider {
          margin: 0.3rem 0;
          border-top: 1px solid #ddd;
        }

        /* Botón personalizado para Logout */
        .logout-button {
          width: 100%;
          background: none;
          border: none;
          padding: 10px 20px;
          text-align: left;
          font-size: 0.95rem;
          color: #333;
          transition: background-color 0.2s ease;
          font-weight: 500;
      }

        .logout-button:hover {
          background-color: #F05941;
          color: white;
          cursor: pointer;
      }
      `}</style>
    </>
  );
};

export default Header;
