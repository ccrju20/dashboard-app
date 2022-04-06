import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  ExtendButtonBase,
  ButtonTypeMap,
} from "@mui/material";
import axios from "axios";
import { IOrder, IOrderDetails, IOrderItems } from "./IOrder";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "orderNumber",
    headerName: "Order Number",
    width: 150,
    editable: true,
  },
  {
    field: "datePosted",
    headerName: "Date Posted",
    width: 220,
    editable: true,
  },
  {
    field: "scheduled",
    headerName: "Scheduled",
    width: 175,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    editable: true,
  },
  {
    field: "delivery",
    headerName: "Delivery",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    field: "account",
    headerName: "Account",
    width: 300,
    editable: true,
  },
  {
    field: "view",
    headerName: "View",
    width: 110,
    renderCell: (params) => {
      return (
        <div>
          <Button onClick={(e) => console.log(params.row)}>view</Button>
        </div>
      );
    },
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

type OrderRow = {
  id: number;
  ordernumber: number;
  dateposted: Date;
  scheduled: string;
  status: string;
  delivery: number;
  account: string;
  orderDetails: IOrderDetails;
  orderItems: IOrderItems[];
  view: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
};

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [rows, setRows] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("api/v1/orders")
      .then((res) => {
        console.log(res);
        let theOrders = res.data;
        setOrders(theOrders);
        setRows(
          theOrders?.map((order: OrderRow) => ({
            id: order.id,
            orderNumber: order.ordernumber,
            datePosted: order.dateposted,
            scheduled: order.scheduled,
            status: order.status,
            delivery: order.delivery,
            account: order.account,
            orderDetails: order.orderDetails,
            orderItems: order.orderItems,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        setLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("inside useEffect");
    const arrOrderNums: string[] = selectedRows.map((o: any) => {
      return o.orderNumber;
    });
    console.log(arrOrderNums);
  }, [selectedRows]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Orders</h1>
        <Grid container justifyContent="center">
          {isLoading && !loadError ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 650, width: "100%" }}>
              {loadError ? (
                <h1>An error occurred</h1>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  disableSelectionOnClick
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = rows.filter((row: any) =>
                      selectedIDs.has(row.id)
                    );
                    console.log(selectedRowData);
                    setSelectedRows(selectedRowData);
                  }}
                />
              )}
            </div>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Orders;
