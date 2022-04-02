import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DialogState as Props } from "./List";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IFormOptionInputs {
  option_id: number;
  price: number;
  size: number;
  //   product: {
  //     id: number;
  //   };
}
const PRODUCT_OPTIONS_API_URL = "api/v1/products/options";

const AddProductOptions: React.FC<Props> = ({
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
  } = useForm<IFormOptionInputs>({});

  console.log(product.options);

  // Submit Add Option
  const addOption: SubmitHandler<IFormOptionInputs> = (
    option: IFormOptionInputs
  ) => {
    close("closeButtonClick");
    Object.assign(option, { product: { id: product.id } });
    console.log(option);
    axios
      .post(PRODUCT_OPTIONS_API_URL, option)
      .then((res) => {
        console.log(res);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    reset({ option_id: 0, price: 0, size: 0 });
  }, [close, reset]);

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="md">
        <form onSubmit={handleSubmit(addOption)}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <DialogTitle>
                  Add Option for Product ID {product.id}{" "}
                </DialogTitle>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <DialogContent>
                <DialogContentText>Current Options:</DialogContentText>
                <List>
                  {product.options?.map((option, index) => {
                    return (
                      <div key={index}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>{index + 1}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={` SKU: ${option.option_id} / size: ${option.size} /
                            price: ${option.price}`}
                          />
                          <IconButton
                            onClick={() => {
                              console.log("delete");
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              </DialogContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={5}>
              <DialogContent>
                <DialogContentText>Enter Option Details:</DialogContentText><br/>
                <Grid container justifyContent="center">
                  <Controller
                    name="option_id"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="SKU"
                        size="small"
                        variant="outlined"
                        error={!!errors.option_id}
                        helperText={
                          errors.option_id ? errors.option_id?.message : ""
                        }
                      />
                    )}
                  />
                  <br />
                  <br />
                  <br />
                  <Controller
                    name="size"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Size"
                        size="small"
                        variant="outlined"
                        error={!!errors.size}
                        helperText={errors.size ? errors.size?.message : ""}
                      />
                    )}
                  />
                  <br />
                  <br />
                  <br />
                  <Controller
                    name="price"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        size="small"
                        variant="outlined"
                        error={!!errors.price}
                        helperText={errors.price ? errors.price?.message : ""}
                      />
                    )}
                  />
                </Grid>
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions>
            <Button type="submit"> Submit</Button>
            <Button onClick={() => close("closeButtonClick")}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddProductOptions;
