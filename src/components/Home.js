import React, { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch('http://localhost:5000/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:5000/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredProducts = category
    ? products.filter((product) => product.categoryId === parseInt(category))
    : products;


  return (
    <div>
      <h1 className="header">Product Listing Page</h1>
      <div className="Searchbar">
        <span className="Searchbar_text">Category</span>
        <select
          onChange={handleCategoryChange}
          value={category}
          className="Searchbar_value"
        >
          <option value="">All</option>
          {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
        </select>
      </div>
      <ul className="product_list">
        {filteredProducts.map((product) => (
          <li class="product_list_item">
            <a href={`/product/${product.id}`}>
              <img src="/laptop.png" alt="iPhone" />
              <div>{product.name}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
