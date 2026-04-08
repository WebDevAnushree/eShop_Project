
import React, { useEffect, useMemo, useState } from "react";
import "./Home.css";
import Product from "./Product";

function Home({ searchTerm }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ categories ONLY from products (only those which exist)
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set);
  }, [products]);

  // ---------- filtering ----------
  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategory !== "all") {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return list;
  }, [products, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  };

  return (
    <div className="home">

      {/* hero */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Shop Smarter with eShop</h1>
          <p>Modern products • Best prices • Fast delivery</p>
        </div>
      </div>

      {/* category bar */}
      <div className="category-bar">

        <button
          className={selectedCategory === "all" ? "cat-active" : ""}
          onClick={() => {
            setSelectedCategory("all");
            setCurrentPage(1);
          }}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "cat-active" : ""}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* products */}
      <div className="products-grid">

        {loading && <p>Loading products...</p>}

        {!loading && currentProducts.length === 0 && (
          <p>No products found.</p>
        )}

        {!loading && currentProducts.map(item => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={Math.round(item.rating)}
            image={item.thumbnail}
            description={item.description}
            brand={item.brand}
            category={item.category}
          />
        ))}
      </div>

      {/* pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>

          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Home;
