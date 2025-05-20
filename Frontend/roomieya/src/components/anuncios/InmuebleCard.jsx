import React from 'react';
import PropTypes from 'prop-types';

const InmuebleCard = ({ nombre, rol, tieneNotificacion, onVerAnuncios }) => {
  const isArrendador = rol === 'arrendador';
  const rolColor = isArrendador ? '#F97300' : '#DE921C';
  const icono = isArrendador ? '/images/house-dollar.png' : '/images/house.png';

  return (
    <div className="inmueble-card position-relative mx-3">
      <h5 className="titulo-inmueble">{nombre}</h5>

      <span
        className="etiqueta-rol"
        style={{ backgroundColor: rolColor, color: 'white' }}
      >
        {rol.charAt(0).toUpperCase() + rol.slice(1)}
      </span>

      <img
        src={icono}
        alt={isArrendador ? 'Casa con símbolo de dólar' : 'Casa'}
        className="img-icono"
        loading="lazy"
      />

      <button className="boton-anuncios" onClick={onVerAnuncios}>
        Ver anuncios
      </button>

      {tieneNotificacion && (
        <div className="campana-notificacion">
          <img src="/images/bell.png" alt="Notificación" style={{ width: '22px' }} />
        </div>
      )}

      <style>{`
        .inmueble-card {
          width: 200px;
          background-color: white;
          padding: 1.2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          transition: transform 0.2s ease-in-out;
        }

        .inmueble-card:hover {
          transform: translateY(-3px);
        }

        .titulo-inmueble {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .etiqueta-rol {
          font-size: 0.75rem;
          padding: 0.25rem 0;
          width: 90px;
          text-align: center;
          border-radius: 6px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .img-icono {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .boton-anuncios {
          background-color: black;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 20px;
          padding: 0.4rem 1.2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }

        .boton-anuncios:hover {
          transform: scale(1.03);
        }

        .campana-notificacion {
          position: absolute;
          top: -12px;
          right: -12px;
          background-color: #FFF4CC;
          border-radius: 50%;
          padding: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

InmuebleCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  rol: PropTypes.oneOf(['roomie', 'arrendador']).isRequired,
  tieneNotificacion: PropTypes.bool,
  onVerAnuncios: PropTypes.func.isRequired
};

InmuebleCard.defaultProps = {
  tieneNotificacion: false
};

export default InmuebleCard;
