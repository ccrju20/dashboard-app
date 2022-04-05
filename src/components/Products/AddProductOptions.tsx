import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IDialog as Props } from "./Interfaces/IDialog";
import { IAddProductOption } from './Interfaces/IProductForm'
import { SchemaOf, object, number} from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Popover from "@mui/material/Popover";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const PRODUCT_OPTIONS_API_URL = "api/v1/products/options";

export const addProductOptionSchema: SchemaOf<IAddProductOption> = object({
  option_id: number().typeError("Must be a number greater than 1").min(1).required(),
  size: number().typeError("Must be a number greater than 1").min(1).required(),
  price: number().typeError("Must be a number greater than 1").min(1).required(),
});

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
  } = useForm<IAddProductOption>({
    resolver: yupResolver(addProductOptionSchema),
  });

  // Submit Add Option
  const addOption: SubmitHandler<IAddProductOption> = (
    option: IAddProductOption
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

  // Submit Delete Option
  const deleteOption = (optionId: number): void => {
    console.log("confirmed delete");
    close("closeButtonClick");
    handleCloseDelete();

    axios
      .delete(PRODUCT_OPTIONS_API_URL + `/${optionId}`)
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDelete = () => {
    setAnchorEl(null);
  };

  const openDelete = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="md">
        <form onSubmit={handleSubmit(addOption)}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <DialogTitle>
                  Add or Delete Option for Product ID {product.id}
                </DialogTitle>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                            aria-describedby={id}
                            onClick={(e) => {
                              handleClickDelete(e);
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                          <Popover
                            id={id}
                            open={openDelete}
                            anchorEl={anchorEl}
                            onClose={handleCloseDelete}
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

                            <Grid container justifyContent="center">
                              <Button
                                onClick={() => {
                                  deleteOption(option.option_id);
                                }}
                              >
                                Confirm
                              </Button>
                              <Button
                                onClick={() => {
                                  handleCloseDelete();
                                }}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Popover>
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              </DialogContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={5}>
              <DialogContent>
                <DialogContentText>
                  <AddCircleOutlineIcon
                    sx={{ marginBottom: -0.75, marginRight: 1 }}
                  />
                  Add Option Details:
                </DialogContentText>
                <br />
                <Grid container justifyContent="center">
                  <Box mt={1}>
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
                  </Box>

                  <Box mt={3}>
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
                  </Box>

                  <Box mt={3}>
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
                  </Box>
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
