// src/pages/AnunciosPage.jsx
import React from 'react';
import InmueblesContainer from '../components/anuncios/InmueblesContainer';

const AnunciosPage = () => {
  return (
    <div className="anuncios-page">
      <h2 className="titulo-anuncios">Anuncios</h2>
      <InmueblesContainer />
      
      <style>{`
        .anuncios-page {
          background-color: #FAFAFA;
          min-height: 100vh;
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .titulo-anuncios {
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default AnunciosPage;
