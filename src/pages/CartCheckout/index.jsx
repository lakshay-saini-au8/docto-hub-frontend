import React from "react";
import { Container } from "react-bootstrap";
import CartCheckoutForm from "../../components/CartCheckoutForm";
import PageName from "../../components/Reusable/PageName";
import selectPageName from "../../components/Reusable/PageName/pageNameSelect";
const CartCheckout = ({ match }) => {
  console.log(match);
  return (
    <Container fluid className="m-0 p-0" style={{ minHeight: "50vh" }}>
      <PageName
        pageName={selectPageName(
          match.path.slice(0, "medicines/checkout".length + 1)
        )}
      />
      <CartCheckoutForm />
    </Container>
  );
};

export default CartCheckout;
