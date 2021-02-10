import React from "react";
import { Row, Col, Image, Form, Badge } from "react-bootstrap";

const CartItem = ({ item, changeCartState, prevState }) => {
  const changeQuantity = (e) => {
    let arr = [...prevState];
    let newArr = arr.map((obj) => {
      if (obj.product === e.target.name) {
        obj.qty = parseInt(e.target.value);
        return obj;
      } else {
        return obj;
      }
    });
    changeCartState(newArr);
  };

  const deleteFromCart = (e) => {
    let id = e.target.getAttribute("id");
    let arr = [...prevState];
    let newArr = arr.map((obj) => {
      if (obj.product !== id) {
        return obj;
      }
    });
    changeCartState(newArr);
  };

  const quantityOptionRender = () => {
    let optionArr = [];
    for (let i = 0; i < item.countInStock; i++) {
      optionArr.push(<option>{i + 1}</option>);
    }
    return optionArr;
  };

  return (
    <>
      <Row className="border rounded m-2 p-2 disable-select">
        <Col
          sm={12}
          md={4}
          className="p-0 d-flex justify-content-start align-items-start"
        >
          <Image
            src={item.image}
            style={{ width: "60px", height: "60px" }}
          ></Image>
          <span className="ml-2 font-weight-bold text-truncate">
            {item.name}
          </span>
        </Col>
        <Col
          sm={12}
          md={8}
          className="d-md-flex justify-content-between align-items-center mt-2 mt-md-0 "
        >
          <p className="m-0 font-weight-bold">
            <span className="d-md-none">Price:</span> ₹ {item.price}
          </p>
          <p className="m-0">
            <Form.Label>Select Quantity</Form.Label>
            <Form.Control
              as="select"
              type="select"
              className="d-inline"
              value={item.qty}
              default={item.qty}
              name={item.product}
              onChange={changeQuantity}
            >
              {quantityOptionRender()}
            </Form.Control>
          </p>
          <p className="m-0 font-weight-bold">
            <span className="d-md-none mt-2">Total:</span> ₹
            {item.qty * item.price}
          </p>
          <Badge
            variant={"danger"}
            className="my-2  m-md-0 font-weight-bold  p-2 text-center"
            style={{ cursor: "pointer" }}
            id={item.product}
            onClick={deleteFromCart}
          >
            <i className="fas fa-trash-alt " id={item.product}></i>
          </Badge>
        </Col>
      </Row>
    </>
  );
};

export default CartItem;
