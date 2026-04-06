import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* LOGO */}
        <Link to="/" className="navbar-brand">
          <img src="/ChillShopLogo.png" alt="ChillShop" />
          <span>ChillShop</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>

          <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
            Cart
            <span className="cart-badge">{totalItems}</span>
          </Link>

          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                {user.name}
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>

      </nav>
    </header>
  );
};

export default Navbar;