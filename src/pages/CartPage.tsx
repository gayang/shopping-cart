import React, { useState } from "react";
import Product from "../types/Product";
import { CartItem } from "../types/CartItem";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/reducers/cartReducer";
import { NavLink } from "react-router-dom";
import Shipping from "../types/Shipping";
import Payment from "../types/Payment";
import axios from "axios";

interface cartPrpos {
  items: CartItem[];
}
interface CartProps {
  user: string;
  product: string;
  shipping: Shipping;
  payment: Payment;
  total: number;
}

const CartPage: React.FC<CartProps> = ({ user, product, shipping, payment, total }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer);

  const onRemove = (item: Product) => {
    dispatch(removeItemFromCart(item));
  };
  const onIncrease = (item: Product) => {
    dispatch(increaseQuantity(item));
  };
  const onDecrease = (item: Product) => {
    dispatch(decreaseQuantity(item));
  };

  const cartTotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    axios
      .post("http://localhost:8080/api/v1/orders", {
        user,
        product,
        shipping,
        payment,
        total,
      })
      .then((response) => {
        console.log("Order created", response.data);
        // Handle success (e.g., show a confirmation message)
      })
      .catch((error) => {
        console.error("Error creating order", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <>
      <div className="shopping-cart-panel">
        {cart.length > 0 ? (
          <div>
            <h2>Shopping Basket:</h2>
            <p>
              You have <b>({cart.length} products)</b> in your shopping cart
            </p>
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <p className="cart-item-title">{item.name}</p>
                <div className="cart-item-data">
                  <li>
                    <button
                      className="cart-item-dc"
                      onClick={() => onDecrease(item)}
                    >
                      -
                    </button>
                  </li>
                  <li className="cart-item-qty">{item.quantity}</li>
                  <li>
                    <button
                      className="cart-item-ic"
                      onClick={() => onIncrease(item)}
                    >
                      +
                    </button>
                  </li>
                  <li className="cart-item-price">{item.price}</li>
                  <li>
                    <button
                      className="cart-item-rm"
                      onClick={() => onRemove(item)}
                    >
                      x
                    </button>
                  </li>
                </div>
              </div>
            ))}
            <div className="cart-total">Total: €{cartTotal.toFixed(2)}</div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </>
  );
}

export default CartPage;
