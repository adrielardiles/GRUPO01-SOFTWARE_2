import React, { useState } from 'react';
import { addRating } from '../features/ratings/ratingsService';

const AgregarRatingPage = () => {
  const [formData, setFormData] = useState({
    reviewerName: '',
    comment: '',
    score: '',
    userId: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRating(formData);
      setMessage('✅ Rating registrado correctamente');
      setFormData({ reviewerName: '', comment: '', score: '', userId: '' });
    } catch (error) {
      setMessage('❌ Error al registrar el rating');
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar nueva reseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del evaluador:
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Comentario:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Puntaje (1-5):
          <input
            type="number"
            name="score"
            min="1"
            max="5"
            value={formData.score}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ID del arrendatario:
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrar Reseña</button>
      </form>
      {message && <p className="message">{message}</p>}

      <style>{`
        .form-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 15px;
          font-weight: bold;
          display: flex;
          flex-direction: column;
        }

        input,
        textarea {
          margin-top: 5px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        textarea {
          resize: vertical;
          min-height: 60px;
        }

        button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }

        button:hover {
          background-color: #0056b3;
        }

        .message {
          margin-top: 15px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AgregarRatingPage;
