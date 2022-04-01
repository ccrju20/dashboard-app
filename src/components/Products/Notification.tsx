import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props: any) => {
  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={3500}
        onClose={props.close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={props.close} severity={props.severity} sx={{ width: "100%"}}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;