import { Col, Row } from "react-bootstrap";
import ErrorMessage from "../../Reusable/ErrorMessage";
import Loader from "../../Reusable/Loader";
import ProductCard from "../../Reusable/ProductCard";
import "./index.css";
const Products = ({ loading, error, products }) => {
  return (
    <Col md={9} className=" rounded ">
      <Row className="m-3 bg-white  p-3">
        {loading ? (
          <div style={{ width: "100%", height: "50vh" }}>
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          products &&
          products.map((product) => <ProductCard product={product} md={4} />)
        )}
      </Row>
    </Col>
  );
};

export default Products;
