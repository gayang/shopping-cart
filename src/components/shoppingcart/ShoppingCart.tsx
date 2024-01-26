import React from "react";
import Product from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/reducers/cartReducer";

interface cartPrpos {
  items: CartItem[];
}

const ShoppingCart = ({ items }: cartPrpos) => {
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
    (total:number, item:any) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {cart.length > 0 ? (
        <div className="shopping-cart-panel">
          <h2>Shopping Basket:</h2>
          <p>
            You have <b>({cart.length} products)</b> in your shopping basket.
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
        </div>
      ) : (
        <p>&nbsp;</p>
      )}
    </>
  );
};

export default ShoppingCart;


