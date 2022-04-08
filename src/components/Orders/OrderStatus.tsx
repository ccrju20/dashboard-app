import React, { useEffect, useState } from "react";
import { IDialogOrder as Props } from "../Interfaces/IDialog";
import axios from "axios";
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
} from "@mui/material";

const OrderStatus: React.FC<Props> = ({
  open,
  close,
  order,
  getOrders,
  orderNumbers,
  setSelectionModel,
  setSelectedRows,
}) => {
  const [isSingleOrder, setIsSingleOrder] = useState<boolean>(true);

  const ORDER_STATUS_CHANGE_API_URL = "api/v1/orders/";

  useEffect(() => {
    if (orderNumbers && orderNumbers.length > 0) {
      console.log(`more than 1 order to be changed`);
      setIsSingleOrder(false);
    } else {
      setIsSingleOrder(true);
    }
  }, [orderNumbers]);

  const changeStatus = (orders: string | string[], status: string): void => {
    console.log(`${orders}: ${status}`);
    close("closeButtonClick");

    axios
      .put(
        isSingleOrder
          ? `api/v1/orders/${orders}/status/${status}`
          : `api/v1/orders/status/${status}`,
        orders
      )
      .then((res) => {
        console.log(res);
        getOrders();
        if (setSelectionModel && setSelectedRows && !isSingleOrder) {
          setSelectionModel([]);
          setSelectedRows([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <DialogTitle>Change Status for {order.ordernumber}</DialogTitle>
            </Grid>
          </Grid>
        </Grid>
        <Button
          name="pending"
          color="warning"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Pending
        </Button>
        <Button
          name="confirmed"
          color="primary"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Confirmed
        </Button>
        <Button
          name="shipped"
          color="secondary"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Shipped
        </Button>
        <Button
          name="canceled"
          color="error"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Canceled
        </Button>
        <Button
          name="refunded"
          color="error"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Refunded
        </Button>
        <Button
          name="complete"
          color="success"
          onClick={(event) => {
            changeStatus(
              isSingleOrder ? order.ordernumber : orderNumbers!,
              event.currentTarget.name
            );
          }}
        >
          Complete
        </Button>
      </Dialog>
    </>
  );
};

export default OrderStatus;
