import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import './FormFeedback.css';

export function FormFeedback({ onSend }) {
  const [feedback, setFeedback] = useState({
    email: '',
    rating: 0,
    text: '',
  });

  const [error, setError] = useState(false);

  const handleChangeInput = (e) => {
    const oldState = feedback;
    const newState = { ...oldState, [e.target.name]: e.target.value };
    setFeedback(newState);
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };
  const handleChangeRating = (e) => {
    const oldState = feedback;
    const newState = { ...oldState, rating: e.target.value };
    setFeedback(newState);
  };

  const clearFields = () => {
    setFeedback({
      email: '',
      rating: 0,
      text: '',
    });
  };

  const handleSend = () => {
    const { email, rating, text } = feedback;
    if (!validateEmail(email) || rating === 0) {
      setError(true);
      return;
    }
    setError(false);
    clearFields();
    onSend({ email, rating, text });
  };

  const ratingOne = 1;
  const ratingTwo = 2;
  const ratingThree = 3;
  const ratingFour = 4;
  const ratingFive = 5;
  const ratingArray = [ratingOne, ratingTwo, ratingThree, ratingFour, ratingFive];

  return (
    <div className="form-feedback">
      <div className="feedback-div">
        <h1>Avaliações</h1>
        <div className="feedbacks">
          <div className="input-and-score">
            <input
              type="email"
              name="email"
              className="email-input"
              value={ feedback.email }
              onChange={ handleChangeInput }
              data-testid="product-detail-email"
              placeholder="Email"
            />
            <div className="stars">
              {ratingArray.map((rating) => (
                <label key={ rating }>
                  <input
                    key={ rating }
                    type="radio"
                    name={ `rating-${rating}` }
                    value={ rating }
                    onChange={ handleChangeRating }
                    checked={ feedback.rating >= rating }
                    data-testid={ `${rating}-rating` }
                    style={ { display: 'none' } }
                  />
                  {feedback.rating >= rating ? <IoStar /> : <IoStarOutline />}
                </label>
              ))}
            </div>
          </div>
          <textarea
            name="text"
            className="text-input"
            value={ feedback.text }
            onChange={ handleChangeInput }
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
          />
          <button
            type="button"
            className="submit-btn"
            data-testid="submit-review-btn"
            onClick={ handleSend }
          >
            Avaliar

          </button>
        </div>
        {error && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    </div>
  );
}

FormFeedback.propTypes = {
  onSend: PropTypes.func.isRequired,
};
