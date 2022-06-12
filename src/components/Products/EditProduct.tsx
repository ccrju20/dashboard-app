import { useEffect, useMemo, useState } from "react";
import { object, string, number, array } from "yup";
import { IDialog as Props } from "../Interfaces/IDialog";
import { IProductForm } from "../Interfaces/IProductForm";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  Grid,
  Box,
  Divider,
  Button,
  TextField,
  Switch,
  CardMedia,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Notification from "./Notification";
import EditProductOption from "./EditProductOption";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const editProductSchema = object({
  title: string().trim().min(1),
  category: string().trim().min(1),
  active: number(),
  img: string().trim().min(1),
  description: string().trim().min(1),
  options: array(
    object({
      option_id: number().typeError("Must be a number greater than 1").min(1),
      size: number().typeError("Must be a number greater than 1").min(1),
      price: number().typeError("Must be a number greater than 1").min(1),
    })
  ),
});

const EditProduct: React.FC<Props> = ({
  open,
  close,
  product,
  getProducts,
}) => {
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [updateError, setUpdateError] = useState(false);
  const [active, setActive] = useState(product?.active);

  const methods = useForm<IProductForm>({
    resolver: yupResolver(editProductSchema),
    defaultValues: useMemo(() => {
      return product;
    }, [product]),
  });

  useEffect(() => {
    methods.reset(product);
    setActive(product?.active);
  }, [product, methods, methods.reset]);

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
      return Object.assign(option, { product: { id: product?.id } });
    });
    console.log(data);

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

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <DialogTitle>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <EditTwoToneIcon /> {product?.title} (Edit)
                  <DialogContentText ml={4}>
                    Product ID: {product?.id}
                  </DialogContentText>
                </Grid>

                <Grid item xs={10} sm={6} mt={2}>
                  <Grid container justifyContent={{ md: "flex-end" }}>
                    <Controller
                      name="category"
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Category"
                          variant="outlined"
                          size="small"
                          error={!!methods.formState.errors.category}
                          helperText={
                            methods.formState.errors.category
                              ? methods.formState.errors.category?.message
                              : ""
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
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    error={!!methods.formState.errors.title}
                    helperText={
                      methods.formState.errors.title
                        ? methods.formState.errors.title?.message
                        : ""
                    }
                  />
                )}
              />
              <Box ml={2}>
                <DialogContentText mb={-1}>Active:</DialogContentText>
                <Controller
                  name="active"
                  control={methods.control}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      checked={active === 1}
                      onChange={(event, value) => {
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
              height="540"
              image={product?.img}
              alt="product"
            />
            <DialogContent>
              <br />
              <Controller
                name="description"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    variant="outlined"
                    error={!!methods.formState.errors.description}
                    helperText={
                      methods.formState.errors.description
                        ? methods.formState.errors.description?.message
                        : ""
                    }
                  />
                )}
              />
              <br />
              <br />
              <Controller
                name="img"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image"
                    fullWidth
                    variant="outlined"
                    error={!!methods.formState.errors.img}
                    helperText={
                      methods.formState.errors.img
                        ? methods.formState.errors.img?.message
                        : ""
                    }
                  />
                )}
              />
              <br />
              <br />
            </DialogContent>
            <Divider />
            <DialogTitle> Edit Product Options </DialogTitle>
            <DialogContent>
              <EditProductOption />
            </DialogContent>
            <br />
            <DialogActions>
              <Button type="submit"> Submit</Button>
              <Button
                onClick={() => {
                  close("closeButtonClick");
                  methods.clearErrors();
                  methods.reset();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
      <Notification
        open={notification}
        close={handleCloseNotification}
        severity={!updateError ? "success" : "error"}
        message={notificationMsg}
      />
    </>
  );
};

export default EditProduct;
