import React, { useState } from "react";
import { Col, Container, Row, Button, Alert, Form } from "react-bootstrap";
// import RangeSlider from "react-bootstrap-range-slider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cartAction";

import ProductDetailLeft from "./LeftSide";
import WriteReview from "./WriteReview";
import ReviewsDisplay from "./ReviewsDisplay";

import "./index.css";
const Detail = ({ product, setProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(addToCart(product._id, quantity));
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <Container fluid className=" mt-4 p-3 p-lg-3">
        <Row className="d-flex justify-content-around">
          <Col lg={8} className="bg-white rounded py-3">
            <ProductDetailLeft product={product} />
          </Col>
          <Col lg={3} className="bg-white rounded">
            <Row className="my-4 p-3">
              <Col>
                {product.countInStock === 0 ? (
                  <>
                    <Alert variant={"danger"}>Not In Stock!!</Alert>
                  </>
                ) : (
                  <>
                    <h5>Select Quantity</h5>
                    <div className="w-100 d-flex justify-content-between align-items-center ">
                      <span className="w-75">
                        <Form.Control
                          value={quantity}
                          type="range"
                          onChange={handleQuantityChange}
                          min={1}
                          max={product.countInStock}
                          className="w-100 bg-primary"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                      <span className="quantity-label font-weight-bolder ml-2 rounded ">
                        {quantity}
                      </span>
                    </div>
                    <Button
                      className="mt-3 w-100 font-weight-bold add-to-cart-detail"
                      variant={"light"}
                      onClick={handleCart}
                    >
                      Add To Cart
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <Row className=" p-2">
              <Col>
                <h5>Seller Information</h5>
                <p className="font-weight-bold text-muted text-truncate m-0">
                  {product.createdBy.name}
                </p>
                <p className="font-weight-bold text-muted text-truncate m-0">
                  {product.createdBy.email}
                </p>
                <p className="font-weight-bold text-muted text-truncate m-0">
                  {product.createdBy.address}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="d-flex justify-content-around mt-4">
          <Col lg={8} className="bg-white rounded py-3">
            <WriteReview setProduct={setProduct} productId={product._id} />
          </Col>
          <Col
            lg={3}
            className="bg-white rounded transparent"
            style={{ opacity: "0" }}
          ></Col>
        </Row>

        <Row className="d-flex justify-content-around mt-4">
          <Col lg={8} className="bg-white rounded py-3">
            <ReviewsDisplay reviews={product.reviews} />
          </Col>
          <Col
            lg={3}
            className="bg-white rounded transparent"
            style={{ opacity: "0" }}
          ></Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;
