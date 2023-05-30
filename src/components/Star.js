import React from 'react';
import PropTypes from 'prop-types';
import { IoStar, IoStarOutline } from 'react-icons/io5';

export function Star({ filled }) {
  return (
    <span className="star">
      {filled ? <IoStar /> : <IoStarOutline />}
    </span>
  );
}

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
};
