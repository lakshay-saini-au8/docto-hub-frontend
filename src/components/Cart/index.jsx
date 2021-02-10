import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartAction";
import PageName from "../Reusable/PageName";
import { Container, Col, Row } from "react-bootstrap";
import selectPageName from "../Reusable/PageName/pageNameSelect";

import CartItem from "./CartItem";
const Cart = ({ match }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalQty = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * Number(item.qty), 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <PageName pageName={selectPageName(match.path)} />
      <Container fluid className="m-0 p-0  mt-0">
        <Container fluid className=" mt-4 p-3 p-lg-3">
          <Row className="d-flex justify-content-around ">
            <Col lg={8} className="bg-white rounded py-3">
              <h5 className="ml-2">Selected Items</h5>
              <Row className="border rounded m-2 p-2 disable-select d-none d-md-flex">
                <Col
                  sm={12}
                  md={4}
                  className="p-0 d-flex justify-content-start align-items-start font-weight-bold"
                >
                  Product Details
                </Col>
                <Col
                  sm={12}
                  md={6}
                  className="d-md-flex justify-content-between align-items-center mt-2 mt-md-0 "
                >
                  <p className="m-0 font-weight-bold">Price</p>
                  <p className="m-0 font-weight-bold">Quantity</p>
                  <p className="m-0 font-weight-bold">Total Cost</p>
                </Col>
              </Row>
              {cartItems.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.product}
                    removeItem={removeItem}
                    item={cartItem}
                  />
                );
              })}
            </Col>
            <Col lg={3} className="bg-primary rounded ">
              <Row className="my-4 p-3">
                <Col></Col>
              </Row>
              <Row className=" p-2">
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      Cart item {cartItems.length}
      <br />
      total qty {totalQty}
      <br />
      sub total{cart.itemsPrice}
      <br />
      shipping{cart.shippingPrice}
      <br />
      tax{cart.taxPrice}
      <br />
      total{cart.totalPrice}
      <br />
    </>
  );
};

export default Cart;
