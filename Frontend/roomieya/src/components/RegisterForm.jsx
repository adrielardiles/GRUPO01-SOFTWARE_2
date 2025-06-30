import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

const AccountRegister = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // para mensaje verde o rojo
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      setIsSuccess(false);
      setMessage("❌ Por favor completa todos los campos");
      return;
    }

    const user = {
    correo,
    contrasena,
    nombreCompleto,
    telefono,
    activo: true 
    };


    try {
      const response = await fetch('http://localhost:8081/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('✅ Registro exitoso. Redirigiendo...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const errorText = await response.text();
        setIsSuccess(false);
        setMessage(`❌ Error: ${errorText}`);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('❌ Error de conexión con el servidor');
      console.error(error);
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
        Registro de Usuario
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

      <InputField
        label="Nombre completo"
        type="text"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
      />

      <InputField
      label="Teléfono"
      type="tel"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      />


      {message && (
        <p
          style={{
            color: isSuccess ? '#2E7D32' : '#D84315',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          {message}
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
        Crear cuenta
      </button>
    </form>
  );
};

export default AccountRegister;
