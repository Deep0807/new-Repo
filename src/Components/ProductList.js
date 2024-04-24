import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "./Api";
import Loader from "./Loader";
import "./ProductList.css";
import AddProduct from "./AddProduct";
const ProductList = ({ }) => {
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery("products", fetchProducts);

  const [products, setProducts] = useState([]);

  // Update products state when data changes
  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]); // Update the products state with the new product
  };


  if (isLoading) return <div><Loader /></div>;
  if (error) return <div className="error">Error: {error.message}
    <div className="add-product"> <AddProduct onProductAdded={handleProductAdded} /></div>
  </div>;


  return (
    <>
      <div className="add-product"> <AddProduct onProductAdded={handleProductAdded} /></div>
      <div className="list-body">
        <h2>Product List</h2>

        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
