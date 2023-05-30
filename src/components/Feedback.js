import React from 'react';
import PropTypes from 'prop-types';
import { Stars } from './Stars';
import './Feedback.css';

export function Feedback({ name, score, message }) {
  return (
    <div className="show-feedbacks">
      <div className="top">
        <p className="email" data-testid="review-card-email">{name}</p>
        <Stars rating={ score } />
      </div>
      <div className="bottom">
        <p className="message" data-testid="review-card-evaluation">{message}</p>
      </div>
    </div>
  );
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
