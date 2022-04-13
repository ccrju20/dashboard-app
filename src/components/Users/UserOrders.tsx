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
                {user.contactInfo?.firstname} {user.contactInfo?.lastname}'s Orders
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
                      <ListItem key={order.id}>
                        <ListItemAvatar>
                          <Avatar alt="product">{index + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              Order #{`${order.ordernumber}`}
                              <br />
                              Date Posted: {`${order.dateposted}`}
                              <br />
                              Is Delivery: {`${order.delivery}`}
                              <br />
                              Scheduled: {`${order.scheduled}`}
                              <br />
                              Status: {`${order.status}`}
                            </>
                          }
                        />
                      </ListItem>
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
