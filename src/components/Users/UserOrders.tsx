import React from "react";
import { IDialogUser as Props } from "../Interfaces/IDialog";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogActions,
  Typography,
  Divider,
} from "@mui/material";

const UserOrders: React.FC<Props> = ({ open, close, user, userOrders }) => {
  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth={true}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              sx={{ backgroundColor: "#00152B", color: "lightgrey" }}
            >
              <DialogTitle>
                {user.contactInfo?.firstname} {user.contactInfo?.lastname}'s
                Orders
              </DialogTitle>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            <DialogContent>
              <Grid container justifyContent="center">
                <List>
                  {userOrders?.map((order, index) => {
                    return (
                      <div key={order.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              alt="product"
                              sx={{ height: 30, width: 30, marginTop: -5 }}
                            >
                              <Typography variant="body2">
                                {index + 1}
                              </Typography>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="overline">
                                Order #{`${order.ordernumber}`}
                                <br />
                                Placed: {`${order.dateposted}`}
                                <br />
                                {order.delivery === 1 ? " Delivery" : " Pickup"}
                                <br />
                                Scheduled: {`${order.scheduled}`}
                                <br />
                                Status: {`${order.status}`}
                              </Typography>
                            }
                            secondary={
                              <>
                                <br />
                                {order.orderItems?.map((item, index) => {
                                  return (
                                    <Typography
                                      key={item.id}
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {`${index + 1}. ${item.product.title} /
                                      $${item.productOption.price} / qty:
                                      ${item.quantity} / total price:
                                      $${item.total_price}`}
                                      {<br />}
                                    </Typography>
                                  );
                                })}
                              </>
                            }
                          />
                        </ListItem>
                        {index !== userOrders.length - 1 && (
                          <>
                            <br /> <Divider />
                          </>
                        )}
                      </div>
                    );
                  })}
                </List>
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

export default UserOrders;
