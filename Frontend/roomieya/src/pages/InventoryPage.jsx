// src/pages/InventoryPage.jsx
import '../styles/PublicacionForm.css';

import React from 'react';
import SubirBienForm from '../components/BienComun/SubirBienForm';
import useBienes from '../hooks/useBienes';

const InventoryPage = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const { subirBien } = useBienes(usuarioId);

  return (
    <div>
      <h1>Registrar Bien Común</h1>
      <SubirBienForm usuarioId={usuarioId} subirBien={subirBien} />
    </div>
  );
};

export default InventoryPage;
