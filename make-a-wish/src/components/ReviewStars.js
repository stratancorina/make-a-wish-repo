import React from 'react';

function ReviewStars({ score, maxStars }) {
  const filledStars = Array(score).fill('★');
  const emptyStars = Array(maxStars - score).fill('☆');
  const stars = [...filledStars, ...emptyStars];

  return (
    <div className="review-stars">
      {stars.map((star, index) => (
        <span key={index} className={star === '★' ? 'filled' : 'empty'}>
          {star}
        </span>
      ))}
    </div>
  );
}

export default ReviewStars;