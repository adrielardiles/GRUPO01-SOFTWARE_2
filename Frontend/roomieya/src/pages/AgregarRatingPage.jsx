import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRating } from '../features/ratings/ratingsService';

const AgregarRatingPage = () => {
  const [formData, setFormData] = useState({
    reviewerName: '',
    comment: '',
    score: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const renterId = 2; // fijo o futuro dinámico

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
      await addRating({ ...formData, userId: renterId });
      setMessage('✅ Rating registrado correctamente');
      setFormData({ reviewerName: '', comment: '', score: '' });
      setTimeout(() => navigate('/renter-profile'), 1000); // redirige tras 1 seg
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
        <button type="submit">Registrar Reseña</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AgregarRatingPage;
