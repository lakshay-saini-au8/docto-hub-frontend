import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Rating from "../../../Reusable/Rating";
import { ratingText } from "../utils";
const ReviewsDisplay = ({ reviews }) => {
  const [start] = useState(0);
  // const moreReviews = () => {
  //   if (start + 3 < reviews.length) {
  //     setStart(start + 3);
  //   } else {
  //     setStart(0);
  //   }
  // };
  return (
    <Col sm={12}>
      <h6 className="bg-secondary w-100 text-white rounded py-1 px-2">
        User Reviews
      </h6>
      {reviews.slice(start, 3).map((review) => {
        return (
          <Col key={review.user} sm={12} className="my-4 px-3 py-2 border">
            <h6 className="my-2">By: {review.name}</h6>
            <p className="m-0">{review.comment}</p>
            <Rating
              value={review.rating}
              text={"  " + review.rating.toString() + " Stars"}
            />
            <small className="d-inline">{ratingText(review.rating)}</small>
          </Col>
        );
      })}
    </Col>
  );
};

export default ReviewsDisplay;
