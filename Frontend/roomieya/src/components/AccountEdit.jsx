import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const AccountEdit = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Accedemos a los datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Verificamos si el usuario está almacenado en localStorage
    if (!user || !user.correo) {
      setMensaje('❌ No se pudo obtener el correo del usuario.');
      return;
    }

    // Validamos si los campos de nombre completo y teléfono están completos
    if (!nombreCompleto.trim() || !telefono.trim()) {
      setMensaje('❌ Todos los campos son obligatorios.');
      return;
    }

    try {
      // Hacemos la solicitud al backend para actualizar los datos del usuario
      const response = await fetch('http://localhost:8081/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: user.correo, // Enviamos el correo que hemos recuperado del localStorage
          nombreCompleto, // Nuevo nombre completo
          telefono, // Nuevo teléfono
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json(); // Obtenemos la respuesta de la actualización

      // Guardamos los datos actualizados en localStorage
      localStorage.setItem('user', JSON.stringify(data));

      setMensaje('✅ Datos actualizados correctamente.');

      setTimeout(() => {
        navigate('/home'); // Redirige al usuario después de 2 segundos
      }, 2000);

    } catch (error) {
      setMensaje(`❌ Error al actualizar: ${error.message}`);
    }
  };

  useEffect(() => {
    // Cargamos los datos del usuario desde localStorage cuando se carga el componente
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setNombreCompleto(user.nombreCompleto || ''); // Establecemos el nombre completo
      setTelefono(user.telefono || ''); // Establecemos el teléfono
    }
  }, []); // Este useEffect se ejecuta solo una vez al cargar el componente

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#FFF8E1',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#E65100', textAlign: 'center', marginBottom: '24px' }}>
        Editar Cuenta
      </h2>

      <InputField
        label="Nombre completo"
        type="text"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
      />

      <InputField
        label="Teléfono"
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#FF6F00',
          border: 'none',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Guardar Cambios
      </button>

      {mensaje && (
        <p style={{ marginTop: '16px', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default AccountEdit;
