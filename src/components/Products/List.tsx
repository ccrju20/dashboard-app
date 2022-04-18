import React, { useState } from "react";
import { IProducts as Props, Product } from "../Interfaces/IProducts";
import { closeReason } from "../Interfaces/IDialog";
import axios from "axios";
import {
  Grid,
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Collapse,
  IconButton,
  Typography,
  CardActionArea,
  Popover,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import EditProduct from "./EditProduct";
import AddProductOption from "./AddProductOptions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Notification from "./Notification";

const ProductList: React.FC<Props> = ({ products, getProducts }) => {
  const [expanded, setExpanded] = useState({});
  const [open, setOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({} as any);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openDeleteProd = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [updateError, setUpdateError] = useState(false);

  const handleEditOpen = (product: Product): void => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleEditClose = (value: closeReason): void => {
    setOpen(false);
  };

  const handleExpandVariants = (id: number): void => {
    setExpanded((expanded) => ({
      ...expanded,
      [id]: !expanded[id as keyof {}],
    }));
  };

  const handleOptionOpen = (product: Product): void => {
    setSelectedProduct(product);
    setOptionOpen(true);
  };

  const handleOptionClose = (value: closeReason): void => {
    setOptionOpen(false);
  };

  // Delete Product
  const handleClickDeleteProd = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeleteProd = () => {
    setAnchorEl(null);
  };

  // Submit Delete Product
  const deleteProduct = (productId: number): void => {
    handleCloseDeleteProd();

    axios
      .delete(`/api/v1/products/${productId}`)
      .then((res) => {
        console.log(res);
        setNotificationMsg(res.data);
        setNotification(true);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(true);
        setNotificationMsg(err.message);
      });
  };

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification(false);
  };

  const renderList = (): JSX.Element[] => {
    return products.map((product, index) => {
      return (
        <Grid item xs={12} md={4} lg={4} key={index}>
          <Card>
            <Grid container>
              <Grid item xs={10}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ fontSize: 12, bgcolor: "#00152B" }}>
                      {product.id}
                    </Avatar>
                  }
                  title={product.title}
                  subheader={`status: ${
                    product.active === 1 ? "active" : "inactive"
                  }`}
                />
              </Grid>

              <Grid item xs={2} mt={2}>
                <IconButton
                  aria-describedby={id}
                  onClick={(e) => {
                    handleClickDeleteProd(e);
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={openDeleteProd}
                  anchorEl={anchorEl}
                  onClose={handleCloseDeleteProd}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }} color="error">
                    <WarningAmberIcon
                      sx={{ marginBottom: -0.5, marginRight: 1 }}
                    />
                    Warning: confirm will remove from database
                  </Typography>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      (Consider marking as inactive)
                    </Typography>
                  </Box>

                  <Grid container justifyContent="center">
                    <Button
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => {
                        handleCloseDeleteProd();
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
            <CardActionArea onClick={() => handleEditOpen(product)}>
              <CardMedia
                component="img"
                height="140"
                image={product.img}
                alt="product"
              />
              <CardContent>
                <Grid container justifyContent="center">
                  <Typography variant="overline" color="text.secondary">
                    Category:
                  </Typography>
                  <Typography ml={2} variant="overline">
                    {product.category.toLowerCase()}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <Typography variant="overline" color="text.secondary">
                    Description:
                  </Typography>
                </Grid>
                <Typography ml={1} variant="body2">
                  "{product.description}"
                </Typography>
              </CardContent>
              <Divider />
              <br />
            </CardActionArea>
            <CardActionArea onClick={() => handleOptionOpen(product)}>
              <Typography variant="overline" color="text.secondary">
                Variants
              </Typography>
              <Collapse
                in={expanded[product.id as keyof {}]}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  {product.options.map((option, index) => {
                    return (
                      <div key={index}>
                        <span>
                          SKU: {option.option_id} / size: {option.size} / price:
                          ${option.price}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>
              </Collapse>
            </CardActionArea>
            <IconButton
              aria-expanded={expanded[product.id as keyof {}]}
              onClick={() => handleExpandVariants(product.id)}
            >
              {!expanded[product.id as keyof {}] ? (
                <ExpandMoreIcon />
              ) : (
                <ExpandLessOutlinedIcon />
              )}
            </IconButton>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <>
      <EditProduct
        open={open}
        close={handleEditClose}
        product={selectedProduct}
        getProducts={getProducts}
      />
      <AddProductOption
        open={optionOpen}
        close={handleOptionClose}
        product={selectedProduct}
        getProducts={getProducts}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {renderList()}
        </Grid>
      </Container>
      <Notification
        open={notification}
        close={handleCloseNotification}
        severity={!updateError ? "success" : "error"}
        message={notificationMsg}
      />
    </>
  );
};

export default ProductList;
