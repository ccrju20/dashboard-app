import React from "react";
import { IDialogUser as Props } from "../Interfaces/IDialog";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogActions,
} from "@mui/material";

const UserInfo: React.FC<Props> = ({ open, close, user }) => {
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
                User Details
                <DialogContentText align="center" sx={{ color: "inherit" }}>
                  ID {user.contactInfo?.id}
                </DialogContentText>
              </DialogTitle>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            <DialogContent>
              <Grid container justifyContent="center">
                <List>
                  <ListItem alignItems="flex-start">
                    <Chip
                      label="Name:"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <ListItemText
                      primary={`${user.contactInfo?.firstname} ${user.contactInfo?.lastname}`}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      label="Phone:"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <ListItemText primary={`${user.contactInfo?.phone}`} />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      label="Address:"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <ListItemText
                      primary={
                        <>
                          {`${user.contactInfo?.address}
                            ${user.contactInfo?.addresstwo}`}
                          <br />
                          {`${user.contactInfo?.city}, ${user.contactInfo?.state}
                            ${user.contactInfo?.postal}`}
                        </>
                      }
                    />
                  </ListItem>
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

export default UserInfo;
