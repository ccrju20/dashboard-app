import React from "react";
import { IDialogOrder as Props } from "../Interfaces/IDialog";
import DialogActions from "@mui/material/DialogActions";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const OrderInfo: React.FC<Props> = ({ open, close, order, getOrders }) => {
  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              sx={{ backgroundColor: "#00152B", color: "lightgrey" }}
            >
              <DialogTitle>
                Order Details
                <DialogContentText align="center" sx={{ color: "inherit" }}>
                  {order.ordernumber}
                </DialogContentText>
              </DialogTitle>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            <DialogContent>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem alignItems="flex-start">
                      <Chip
                        label="Email:"
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      />
                      <ListItemText
                        primary={
                          <Link component={RouterLink} to="" underline="none">
                            {`${order.orderDetails?.email}`}
                          </Link>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <Chip
                        label="Name:"
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      />
                      <ListItemText
                        primary={`${order.orderDetails?.firstname}
                          ${order.orderDetails?.lastname}`}
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <Chip
                        label="Phone:"
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      />
                      <ListItemText primary={`${order.orderDetails?.phone}`} />
                    </ListItem>
                  </List>
                  {order.orderDetails?.address !== "" && (
                    <ListItem alignItems="flex-start">
                      <Chip
                        label="Address:"
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      />
                      <ListItemText
                        primary={
                          <>
                            {`${order.orderDetails?.address}
                            ${order.orderDetails?.addresstwo}`}
                            <br />
                            {`${order.orderDetails?.city}, ${order.orderDetails?.state}
                            ${order.orderDetails?.postal}`}
                          </>
                        }
                      />
                    </ListItem>
                  )}
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Divider />
                  <Grid container justifyContent="center" mt={2}>
                    <Typography variant="overline">Order Items</Typography>
                  </Grid>
                  <List>
                    {order.orderItems?.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar alt="product" src={item.product.img} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${item.product.title} / $${item.total_price}`}
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`qty: ${item.quantity}`}
                                </Typography>
                                {` - SKU: ${item.productOption.option_id} / base price: ${item.productOption.price}`}
                              </>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            onClick={() => {
              close("closeButtonClick");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderInfo;
