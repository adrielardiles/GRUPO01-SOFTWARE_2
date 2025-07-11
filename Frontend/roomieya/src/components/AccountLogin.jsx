import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

const AccountLogin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { correo, contrasena };

    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('✅ Usuario logueado:', userData);
          // Guardando todos los datos del usuario


        // Verifica el valor de userData.id
        console.log('ID del usuario:', userData.id);
        console.log('Correo del usuario:', userData.correo);  // Asegúrate de que este ID sea correcto

        // Guarda la información relevante (usuarioId) en localStorage
        localStorage.setItem('usuarioId', userData.id);  // Asegúrate de que 'id' es el campo correcto
        localStorage.setItem('nombre_completo', userData.nombreCompleto);
        localStorage.setItem('correo',userData.correo); // Guarda el nombre completo
        localStorage.setItem('user', JSON.stringify(userData));

        console.log(userData);  // Asegúrate de que este objeto contiene un campo 'correo'



        setError('');
        navigate('/home');  // Redirige a la página de inicio
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || '❌ Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('❌ Error de conexión con el servidor');
      console.error(err);
    }
  };

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
        Iniciar Sesión
      </h2>

      <InputField
        label="Correo electrónico"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <InputField
        label="Contraseña"
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      {error && (
        <p style={{ color: '#D84315', textAlign: 'center', marginBottom: '12px' }}>
          {error}
        </p>
      )}

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
        Iniciar sesión
      </button>

      <p style={{ textAlign: 'center', marginTop: '12px' }}>
        <a href="/recuperar" style={{ color: '#E65100', textDecoration: 'underline' }}>
          ¿Olvidaste tu contraseña?
        </a>
      </p>
      <p style={{ textAlign: 'center', marginTop: '8px' }}>
        ¿No tienes una cuenta?{' '}
        <span
          style={{ color: '#E65100', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Regístrate aquí
        </span>
      </p>
    </form>
  );
};

export default AccountLogin;
