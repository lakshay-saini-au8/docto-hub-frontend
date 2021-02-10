import React, { useState } from "react";
import Rating from "../../../Reusable/Rating";
import { Col, Button, Form } from "react-bootstrap";
import { ratingText } from "../utils";
import { useSelector } from "react-redux";
import { addNewReview, getProductById } from "../../../../utils/api";
import ErrorMessage from "../../../Reusable/ErrorMessage";

const WriteReview = ({ setProduct, productId }) => {
  const [review, setReview] = useState({ comment: "", rating: 0 });
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submitReview = (e) => {
    e.preventDefault();
    setLoading(true);
    addNewReview(userInfo.token, productId, review).then((res) => {
      const { success, message } = res;
      if (success) {
        setReview({ comment: "", rating: 0 });
        getProductById(productId).then((res) => {
          const { product, message } = res;
          if (product) {
            setProduct(product);
          }
          if (message) {
            setError(message);
          }
        });
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
    });
  };

  const handleCommentChange = (e) => {
    setReview(() => {
      return { ...review, comment: e.target.value };
    });
  };

  const changeRating = (e) => {
    setReview(() => {
      return { ...review, rating: e.target.value };
    });
  };

  return (
    <>
      <Col sm={12}>
        <h6 className="bg-secondary w-100 text-white rounded py-1 px-2">
          Write A Review
        </h6>
      </Col>
      <Col className="m-0">
        <Form onSubmit={submitReview}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={4}
              name="bio"
              value={review.comment}
              onChange={handleCommentChange}
              variant="lite"
            />
          </Form.Group>
          <p>Rate the Product</p>
          <div className="w-100 d-flex justify-content-start align-items-center rating-container mb-5">
            <span className="mr-2" style={{ width: "40%" }}>
              <Form.Control
                type="range"
                min={0}
                max={5}
                step={1}
                value={review.rating}
                onChange={changeRating}
                className="rating-range"
                style={{ cursor: "pointer" }}
              />
            </span>

            <span className="rating-comp mb-5">
              <Rating value={review.rating} />
              <span className="font-weight-bold">
                {review.rating} <small>{ratingText(review.rating)}</small>
              </span>
            </span>
          </div>
          {error && <ErrorMessage error={error} />}
          {userInfo ? (
            loading ? (
              <Button className=" mt-3 font-weight-bold add-to-cart-detail">
                Adding
              </Button>
            ) : (
              <Button
                type="submit"
                className=" mt-3 font-weight-bold add-to-cart-detail"
              >
                Submit Review
              </Button>
            )
          ) : (
            <Button className=" mt-3 font-weight-bold add-to-cart-detail">
              Login
            </Button>
          )}
        </Form>
      </Col>
    </>
  );
};

export default WriteReview;
