import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../redux/actions/cartActions';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) quantity = 1;
    dispatch(updateCartQuantity(item.id, quantity));
  };

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt="product" />
              <div className="details">
                <h2>{item.title}</h2>
                <p>${item.price} x {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
          ))}
          <p className="total">Total: ${total}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
