import React from "react";
import { Col, Row, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductCard = ({ product, md, lg }) => {
  return (
    <>
      <Col sm={6} md={md} lg={lg} className="mb-2 p-3" key={product._id}>
        <Card className="p-3 product-card">
          <Link to="/doctor-profile/id">
            <Image src={product.image} className="product-card-img"></Image>
            <Card.Title className="product-card-title mt-3">
              {product.name}
            </Card.Title>
          </Link>

          <small className="text-muted my-1">
            <i className="fas fa-money-bill mr-1"></i>
            {product.price}
          </small>

          <Row className="px-2  align-self-start">
            <Col
              as={Link}
              to="/doctor-book/id"
              className="product-card-button py-1  m-1 book-now d-flex justify-content-center align-items-center"
            >
              Add To Cart
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default ProductCard;
