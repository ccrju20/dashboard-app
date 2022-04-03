import { useState } from "react";
import { IProducts as Props, Product} from "./Interfaces/IProducts";
import { closeReason } from './Interfaces/IDialog'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import Typography from "@mui/material/Typography";
import EditProduct from "./EditProduct";
import AddProductOption from './AddProductOptions'

const ProductList: React.FC<Props> = ({ products, getProducts }) => {
  const [expanded, setExpanded] = useState({});
  const [open, setOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({} as any);

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

  const renderList = (): JSX.Element[] => {
    return products.map((product, index) => {
      return (
        <Grid item xs={12} md={4} lg={4} key={index}>
          <Card>
            <CardActionArea onClick={() => handleEditOpen(product)}>
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
    </>
  );
};

export default ProductList;
