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
      setMessage('Rating registrado correctamente ✅');
      setFormData({ reviewerName: '', comment: '', score: '', userId: '' });
    } catch (error) {
      setMessage('❌ Error al registrar el rating');
    }
  };

  return (
    <div>
      <h2>Registrar nuevo rating</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="reviewerName"
          placeholder="Nombre del evaluador"
          value={formData.reviewerName}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Comentario"
          value={formData.comment}
          onChange={handleChange}
        />
        <input
          type="number"
          name="score"
          placeholder="Puntaje (1-5)"
          min="1"
          max="5"
          value={formData.score}
          onChange={handleChange}
        />
        <input
          type="number"
          name="userId"
          placeholder="ID del arrendatario"
          value={formData.userId}
          onChange={handleChange}
        />
        <button type="submit">Registrar Rating</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AgregarRatingPage;
