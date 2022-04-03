import { useEffect, useMemo, useState } from "react";
import { object, string, number } from "yup";
import { IDialog as Props } from "./Interfaces/IDialog";
import { IProductForm } from "./Interfaces/IProductForm";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Grid, Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardMedia from "@mui/material/CardMedia";
import Switch from "@mui/material/Switch";
import Notification from "./Notification";
import EditProductOption from "./EditProductOption";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

export const editProductSchema = object({
  title: string().trim().min(1),
  category: string().trim().min(1),
  active: number(),
  img: string().trim().min(1),
  description: string().trim().min(1),
});

const EditProduct: React.FC<Props> = ({
  open,
  close,
  product,
  getProducts,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductForm>({
    resolver: yupResolver(editProductSchema),
    defaultValues: useMemo(() => {
      return product;
    }, [product]),
  });

  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [updateError, setUpdateError] = useState(false);
  const [active, setActive] = useState(product.active);

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification(false);
  };

  // Form Submission
  const formSubmitHandler: SubmitHandler<IProductForm> = (
    data: IProductForm
  ) => {
    close("closeButtonClick");

    data.options.map((option) => {
      Object.assign(option, { product: { id: product.id } });
    });
    console.log(data);
    // make api put call
    axios
      .put("api/v1/products", data)
      .then((res) => {
        console.log(res);
        setNotificationMsg(
          `Product ID: ${res.data.id} - Updated Successfully!`
        );
        setNotification(true);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(true);
        setNotificationMsg(err.message);
      });
  };

  useEffect(() => {
    reset(product);
    setActive(product.active);
  }, [product, reset]);

  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <DialogTitle>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6}>
                <EditTwoToneIcon /> {product.title} (Edit)
                <DialogContentText ml={4}>
                  Product ID: {product.id}
                </DialogContentText>
              </Grid>

              <Grid item xs={10} sm={6} mt={2}>
                <Grid container justifyContent={{ md: "flex-end" }}>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Category"
                        variant="outlined"
                        size="small"
                        error={!!errors.category}
                        helperText={
                          errors.category ? errors.category?.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogTitle>
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
                      value ? setActive(1) : setActive(0);
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
          </DialogContent>
          <Divider />
          <DialogTitle> Edit Product Options </DialogTitle>
          <DialogContent>
            <EditProductOption
              productOptions={product.options}
              formSubmitHandler={formSubmitHandler}
              errors={errors}
              controlProduct={control}
            />
          </DialogContent>
          <br />
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
