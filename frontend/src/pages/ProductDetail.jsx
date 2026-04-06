import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/productDetails.css';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert('Added to cart');
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-error">
        Product not found
      </div>
    );
  }

  return (
    <div className="product-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>

        <Link to="/shop">Shop</Link>
        <span>/</span>

        <p>{product.name}</p>
      </div>

      {/* MAIN */}
      <section className="product-layout">

        {/* IMAGE */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="main-product-image"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="product-info-panel">

          <span className="product-badge">
            CHILLSHOP EXCLUSIVE
          </span>

          <h1>{product.name}</h1>

          <div className="price-row">
            <h2>₹{product.price.toFixed(2)}</h2>

            <span
              className={
                product.stock > 0
                  ? 'stock in-stock'
                  : 'stock out-stock'
              }
            >
              {product.stock > 0
                ? 'In Stock'
                : 'Out of Stock'}
            </span>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          {/* FEATURES */}
          <div className="feature-list">

            <div className="feature-item">
              <span>Premium Quality</span>
            </div>

            <div className="feature-item">
              <span>Fast Delivery</span>
            </div>

            <div className="feature-item">
              <span>Secure Checkout</span>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="action-buttons">

            <button
              onClick={handleAddToCart}
              className="add-cart-btn"
            >
              Add To Cart
            </button>

            <Link to="/shop" className="continue-btn">
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ProductDetail;