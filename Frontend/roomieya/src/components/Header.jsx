// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#F57C00', padding: '0.75rem 2rem' }}
    >
      <a className="navbar-brand text-white fw-bold" href="/" style={{ fontSize: '1.5rem' }}>
        RoomieYa
      </a>

      <div className="ms-auto">
        <img
          src="/icons/avatarImage.png"
          alt="Perfil"
          width="32"
          height="32"
          className="d-inline-block align-top"
          style={{ cursor: 'pointer', filter: 'invert(1)' }}
          onClick={() => navigate('/register')}
        />
      </div>
    </nav>
  );
};

export default Header;
