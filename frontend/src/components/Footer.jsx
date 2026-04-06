import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <h2>ChillShop</h2>

          <p>
            Modern shopping designed with simplicity,
            comfort, and premium experience in mind.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">

          <div className="footer-column">
            <span>Company</span>

            <Link to="/about">About</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/profile">Profile</Link>
          </div>

          <div className="footer-column">
            <span>Support</span>

            <Link to="/return">Return Policy</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/cart">Cart</Link>
          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ChillShop. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;