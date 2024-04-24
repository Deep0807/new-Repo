import React, { useState } from "react";
import { useMutation, queryCache } from "react-query";
import { addProduct } from "./Api";
import "./AddProduct.css"; // Import CSS file for styling

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      // Invalidate the products query after successful mutation
      // queryCache.invalidateQueries("products");
      alert("Product added successfully!");
      // setAddedData(formData);
      setFormData({ name: "", description: "", price: "" });
      setShowModal(false); // Close modal after form submission
    },
    onError: (error) => {
      alert("Error adding product: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all fields.");
      return;
    }
    const newProduct = { ...formData, id: Date.now() }; // Create a new product object with a unique ID
    onProductAdded(newProduct);
    setShowModal(false)
    mutation.mutate(formData);
  };

  return (
    <div>
      <button className="add-product-btn" onClick={() => setShowModal(true)}>
        Add Product
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modals">
            <div className="modal-content">
              <div className="header-content">
                <div>
                  <h2>Add Product</h2>
                </div>
                <div>
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <input
                  className="input-field"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  className="input-field"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
                <button className="submit-btn" type="submit">
                  {mutation.isLoading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
