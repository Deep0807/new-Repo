import { QueryClient } from "react-query";

const BASE_URL = process.env.REACT_APP_URL_PATH;
console.log(process.env.REACT_APP_URL_PATH);

const queryClient = new QueryClient();

const fetchProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products || []; 
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

const addProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  queryClient.invalidateQueries("products");
};

export { fetchProducts, addProduct };
