import { useState, useEffect } from "react";
import { IProducts } from "../Interfaces/IProducts";
import { closeReason } from "../Interfaces/IDialog";
import axios from "axios";
import AddProductMain from "./NewProduct/AddProductMain";
import List from "./List";
import {
  Grid,
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ReportIcon from "@mui/icons-material/Report";

const PRODUCTS_REST_API_URL = "api/v1/products";

const Products = () => {
  const [products, setProducts] = useState<IProducts["products"]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleAddOpen = (): void => {
    setOpen(true);
  };

  const handleAddClose = (value: closeReason): void => {
    setOpen(false);
  };

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
      <AddProductMain
        open={open}
        close={handleAddClose}
        getProducts={getProducts}
      />
      <Grid container justifyContent="center" mt={4}>
        <Typography variant="h4">
          <CakeOutlinedIcon
            fontSize="large"
            sx={{ marginBottom: -0.5, marginRight: 1 }}
          />
          Products
        </Typography>
        <Grid container>
          <Grid item xs={0.5} />

          <Grid item xs={11}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        handleAddOpen();
                        console.log("add");
                      }}
                      variant="outlined"
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  justifyContent={{ xs: "center", sm: "flex-end" }}
                >
                  <Chip
                    label={`Total: ${products.length}`}
                    color="primary"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0.5} />
        </Grid>

        <List products={products} getProducts={getProducts} />
        {isLoading && !loadError && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {loadError && (
          <>
            <Typography variant="h5">
              <ReportIcon fontSize="large" sx={{ marginBottom: -1, marginRight: 1 }} />
              Error loading products
            </Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default Products;
