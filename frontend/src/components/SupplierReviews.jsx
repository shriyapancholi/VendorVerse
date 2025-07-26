import React from "react";

const reviews = [
  { id: 1, vendor: "Ankit Chaatwala", rating: 4, comment: "Fresh ingredients, good quality!", date: "2025-07-25" },
  { id: 2, vendor: "Juice Center", rating: 5, comment: "Always reliable. Loved the fruits!", date: "2025-07-22" },
  { id: 3, vendor: "Tandoori Point", rating: 3, comment: "Packaging was poor but quality fine.", date: "2025-07-20" }
];

const getStars = (count) =>
  "★".repeat(count) + "☆".repeat(5 - count);

export default function SupplierReviews() {
  const average = (
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="supplier-reviews">
      <h3>⭐ Ratings & Reviews</h3>
      <div className="summary">
        <strong>{average} / 5</strong> based on {reviews.length} reviews
      </div>
      <ul className="review-list">
  {reviews.map((review) => (
    <li key={review.id} className="review-card">
      <div className="review-header">
        <div className="vendor-name">{review.vendor}</div>
        <div className="stars">{getStars(review.rating)}</div>
      </div>
      <div className="comment">“{review.comment}”</div>
      <div className="date">{review.date}</div>
    </li>
))}
</ul>
    </div>
  );
}
