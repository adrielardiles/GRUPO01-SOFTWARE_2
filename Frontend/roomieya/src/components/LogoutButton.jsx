import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Sesión cerrada exitosamente');
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#f04c2f] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
    >
      <FiLogOut /> Cerrar sesión
    </button>
  );
};

export default LogoutButton;