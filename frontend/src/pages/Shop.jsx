import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // SEARCH
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    // SORT
    if (sort === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, sort]);

  return (
    <div className="shop-page">

      {/* HERO */}
      <section className="shop-hero">
        <span className="shop-tag">CHILLSHOP STORE</span>

        <h1>
          Discover Products
          <br />
          That Match Your Style
        </h1>

        <p>
          Minimal essentials, premium quality, and modern collections curated for everyday living.
        </p>
      </section>

      {/* CONTROLS */}
      <section className="shop-controls">

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>

        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

      </section>

      {/* PRODUCTS */}
      <section className="shop-products">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <h3>No Products Found</h3>
            <p>Try searching with another keyword.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default Shop;