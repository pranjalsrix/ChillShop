import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">CHILLSHOP COLLECTION 2026</span>

          <h1>
            Minimal Style.
            <br />
            Maximum Presence.
          </h1>

          <p>
            Explore premium products curated for modern lifestyles.
            Clean design, smooth shopping, and everyday essentials.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">
              Shop Now
            </Link>

            <Link to="/about" className="secondary-btn">
              Explore
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
            alt="ChillShop Hero"
          />
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <span className="section-tag">FEATURED PRODUCTS</span>
            <h2>Trending Right Now</h2>
          </div>

          <Link to="/shop" className="view-all">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* BANNER SECTION */}
      <section className="promo-banner">
        <div className="promo-content">
          <span>NEW ARRIVALS</span>
          <h2>Designed For Everyday Comfort</h2>
          <p>
            Upgrade your collection with modern essentials built for style and simplicity.
          </p>

          <Link to="/shop" className="primary-btn">
            Browse Collection
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;