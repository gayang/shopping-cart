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
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";

interface cartPrpos {
  items: CartItem[];
}

function CheckoutPage() {
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

  return (
    <>
      <div className="delivery-data">
        <section>
          <header>
            <h2>Delivery Options</h2>
          </header>
          <div>
            <h3>Delivery address</h3>
            <p>Lutherinkatu 123, 00100 Helsinki</p>
            <Textarea
              name="address"
              value="address..."
              label="Address"
              onChange="{handleChange}"
              className="form-control"
              row="8"
            />
          </div>
        </section>
        <section>
          <header>
            <h2>Payment</h2>
          </header>
          <div>
            <h3>Select payment method</h3>
            <div>
              <Input
                name="card"
                id="card"
                value="{}"
                label="Credit or Debit Card"
                error="{}"
                onChange="{}"
                type="radio"
                className="form-control"
              />
              <Input
                name="paypal"
                id="paypal"
                value="{}"
                label="Paypal"
                error="{}"
                onChange="{}"
                type="radio"
                className="form-control"
              />
              <Input
                name="gpay"
                id="paypal"
                value="{}"
                label="GPay"
                error="{}"
                onChange="{}"
                type="radio"
                className="form-control"
              />
            </div>
            <div>
              <h3>Add card</h3>
              <Input
                name="cardno"
                id="cardno"
                value="{}"
                label="Card number"
                error="{}"
                onChange="{}"
                type="input"
                className="form-control"
              />
              <Input
                name="mmyy"
                id="mmyy"
                value="{}"
                label="MM/YY"
                error="{}"
                onChange="{}"
                type="input"
                className="form-control"
              />
              <Input
                name="cvv"
                id="cvv"
                value="{}"
                label="CVV"
                error="{}"
                onChange="{}"
                type="input"
                className="form-control"
              />
            </div>
          </div>
        </section>
      </div>

      <div>
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
          </div>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
