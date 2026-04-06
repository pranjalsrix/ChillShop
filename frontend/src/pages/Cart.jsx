import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">

      {/* HEADER */}
      <section className="cart-header">
        <span className="cart-tag">YOUR CART</span>

        <h1>
          Shopping Cart
        </h1>

        <p>
          Review your selected products before proceeding to checkout.
        </p>
      </section>

      {cartItems.length === 0 ? (
        <div className="empty-cart">

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven’t added anything yet.
          </p>

          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="cart-layout">

          {/* LEFT */}
          <div className="cart-items">

            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="cart-item"
              >

                <div className="cart-image-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-content">

                  <div className="cart-item-top">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-bottom">

                    <div className="qty-controls">

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty - 1)
                        }
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty + 1)
                        }
                      >
                        +
                      </button>

                    </div>

                    <h4>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </h4>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="cart-summary">

            <div className="summary-card">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <p>{cartItems.length}</p>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <p>Free</p>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <h3>₹{totalPrice.toFixed(2)}</h3>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="checkout-btn"
              >
                Proceed To Checkout
              </button>

              <Link to="/shop" className="shop-more-btn">
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;