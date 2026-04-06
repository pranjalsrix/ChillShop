import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">

      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />

        <div className="product-overlay">
          <span>View Product</span>
        </div>
      </div>

      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p className="product-category">Premium Collection</p>
        </div>

        <div className="product-bottom">
          <p className="price">₹{product.price}</p>

          <button className="product-btn">
            Explore
          </button>
        </div>
      </div>

    </Link>
  );
};

export default ProductCard;