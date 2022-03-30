import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

export interface IState {
  products: {
    id: number;
    title: string;
    description: string;
    img: string;
    category: string;
    active: number;
    options: {
      id: number;
      option_id: number;
      price: number;
      size: number;
    }[];
  }[];
  loadError: boolean;
  isLoading: boolean;
}

const PRODUCTS_REST_API_URL = "http://localhost:8080/api/v1/products";

const Products = () => {
  const [products, setProducts] = useState<IState["products"]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(PRODUCTS_REST_API_URL, {
        params: { category: "all", page: 1, size: 10 },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Products</h1>
      <List products={products} loadError={loadError} isLoading={isLoading} />
      {loadError && <h1>An error occurred</h1>}
    </>
  );
};

export default Products;
