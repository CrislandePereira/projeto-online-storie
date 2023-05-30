import React from 'react';
import PropTypes from 'prop-types';
import { Star } from './Star';

export function Stars({ rating }) {
  const maxRating = 5;
  const stars = Array(maxRating).fill(0);

  return (
    <div className="stars" data-testid="review-card-rating">
      { stars.map((_, index) => (
        <Star
          key={ index }
          filled={ index < rating }
        />
      ))}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};
