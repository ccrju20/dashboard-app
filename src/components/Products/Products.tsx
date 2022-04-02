import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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
  getProducts: () => void;
}

const PRODUCTS_REST_API_URL = "api/v1/products";

const Products = () => {
  const [products, setProducts] = useState<IState["products"]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    axios
      .get(PRODUCTS_REST_API_URL, {
        params: { category: "all", page: 1, size: 15 },
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
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <h1>Products</h1>
        <List products={products} getProducts={getProducts} />
        {isLoading && !loadError && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {loadError && <h1>An error occurred</h1>}
      </Grid>
    </>
  );
};

export default Products;
