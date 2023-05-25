import React from 'react';
import PropTypes from 'prop-types';
import { Stars } from './Stars';

export function Feedback({ name, score, message }) {
  return (
    <div>
      <p data-testid="review-card-email">{name}</p>
      <Stars rating={ score } />
      <p data-testid="review-card-evaluation">{message}</p>
    </div>
  );
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
