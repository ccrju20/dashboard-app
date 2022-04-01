import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { DialogState as Props } from "./List";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Notification from "./Notification";

interface IFormInputs {
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
}

const schema = yup.object().shape({
  title: yup.string(),
});

const EditProduct: React.FC<Props> = ({
  open,
  close,
  product,
  setLoadError,
  setProducts,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return product;
    }, [product]),
  });

  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [updateError, setUpdateError] = useState(false);
  const [active, setActive] = useState(product.active);

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(false);
  };

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
    close("closeButtonClick");

    data.options.map((option) => {
      Object.assign(option, { product: { id: product.id } });
    });
    console.log(data);

    // make api put call
    axios
      .put("http://localhost:8080/api/v1/products", data)
      .then((res) => {
        console.log(res);
        setNotificationMsg(`Product ID: ${res.data.id} - Updated Successfully!`)
        setNotification(true);
        axios
          .get("http://localhost:8080/api/v1/products", {
            params: { category: "all", page: 1, size: 15 },
          })
          .then((response) => {
            setProducts(response.data.products);
          })
          .catch((err) => {
            setLoadError(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(true)
        setNotificationMsg(err.message)
      });
  };

  useEffect(() => {
    reset(product);
    setActive(product.active);
  }, [product]);

  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <DialogTitle>Edit Product ID: {product.id} </DialogTitle>
          <Grid container justifyContent="center">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title?.message : ""}
                />
              )}
            />
            <Box ml={2}>
              <DialogContentText mb={-1}>Active:</DialogContentText>
              <Controller
                name="active"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch
                    checked={active === 1}
                    onChange={(event, value) => {
                      console.log(value);
                      onChange(value ? 1 : 0);
                      {
                        value ? setActive(1) : setActive(0);
                      }
                    }}
                  />
                )}
              />
            </Box>
          </Grid>
          <br />
          <CardMedia
            component="img"
            height="240"
            image={product.img}
            alt="product"
          />
          <DialogContent>
            {product.options?.map((option) => {
              return (
                <div key={option.id}>
                  <span>
                    SKU: {option.option_id} / size: {option.size} / price: $
                    {option.price}
                  </span>
                </div>
              );
            })}
            <br />
            <br />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  variant="outlined"
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description?.message : ""
                  }
                />
              )}
            />
            <br />
            <br />
            <Controller
              name="img"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image"
                  fullWidth
                  variant="outlined"
                  error={!!errors.img}
                  helperText={errors.img ? errors.img?.message : ""}
                />
              )}
            />
            <br />
            <br />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category ? errors.category?.message : ""}
                />
              )}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button type="submit"> Submit</Button>
            <Button onClick={() => close("closeButtonClick")}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Notification
          open={notification}
          close={handleCloseNotification}
          severity={!updateError ? "info" : "error"}
          message={notificationMsg}
        />
    </div>
  );
};

export default EditProduct;