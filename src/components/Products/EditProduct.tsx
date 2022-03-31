import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { DialogState as Props } from "./List";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const EditProduct: React.FC<Props> = ({ open, close, product }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
    close("closeButtonClick");
    // make api put call
  };
  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="md">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContentText>Product ID: {product.id}</DialogContentText>
          <CardMedia
            component="img"
            height="240"
            image={product.img}
            alt="product"
          />
          {/* <img src={product.img} /> */}
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
            <Grid container>
              <Grid item xs={6}>
                <DialogContentText>Title: {product.title} </DialogContentText>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="title"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title ? errors.title?.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <br />
            <DialogContentText>Description: {product.description} </DialogContentText>
            <Controller
              name="description"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description?.message : ""
                  }
                />
              )}
            />
            <br />
            <DialogContentText>Image: {product.img} </DialogContentText>
            <Controller
              name="img"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image"
                  variant="outlined"
                  error={!!errors.img}
                  helperText={errors.img ? errors.img?.message : ""}
                />
              )}
            />
            <br />
            <DialogContentText>Category: {product.category} </DialogContentText>
            <Controller
              name="category"
              defaultValue=""
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
            <DialogContentText>Active: {product.active} </DialogContentText>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Active"
                  variant="outlined"
                  error={!!errors.active}
                  helperText={errors.active ? errors.active?.message : ""}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit"> Submit</Button>
            <Button onClick={() => close("closeButtonClick")}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditProduct;
