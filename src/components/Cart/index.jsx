import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartAction";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalQty = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * Number(item.qty), 0)
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
    <div>
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
      {cartItems.map((item) => (
        <>
          <button onClick={() => removeItem(item.product)}>Remove</button>
          <br />
        </>
      ))}
    </div>
  );
};

export default Cart;
