import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";
import { IOrder, IOrderDetails, IOrderItems } from "./IOrder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "orderNumber",
    headerName: "Order Number",
    width: 125,
    renderCell: (params) => {
      return (
        <div>
          <Button variant="text" onClick={() => console.log(params.row)}>
            {params.row.orderNumber}
          </Button>
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const handleColor = (status: any) => {
        switch (status) {
          case "PENDING":
            return "primary";
          case "SHIPPED":
            return "warning";
          case "COMPLETE":
            return "success";
          case "CANCELED":
            return "error";
          case "REFUNDED":
            return "error";
        }
      };
      return (
        <>
          <Chip
            label={params.row.status}
            color={handleColor(params.row.status)}
            // color={params.row.status === "COMPLETE" ? "success" : "primary"}
            variant="outlined"
            onClick={() => {
              console.log("status change");
            }}
          />
        </>
      );
    },
  },
  {
    field: "datePosted",
    headerName: "Date Posted",
    width: 220,
  },
  {
    field: "scheduled",
    headerName: "Scheduled",
    width: 180,
    editable: true,
    renderCell: (params) => {
      return (
        <>
          <Chip
            label={params.row.scheduled}
            variant="outlined"
            color={params.row.scheduled === "ASAP" ? "warning" : "secondary"}
          />
        </>
      );
    },
  },
  {
    field: "delivery",
    headerName: "Method",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      return (
        <>
          {params.row.delivery === 0 ? (
            <Chip
              variant="outlined"
              color="success"
              label="Pickup"
              icon={<StorefrontIcon />}
            />
          ) : (
            <Chip
              variant="outlined"
              color="warning"
              label="Delivery"
              icon={<DirectionsCarOutlinedIcon />}
            />
          )}
        </>
      );
    },
  },
  {
    field: "account",
    headerName: "Account",
    width: 290,
    renderCell: (params) => {
      return (
        <Grid container justifyContent="center">
          {params.row.account === "00000000-0000-0000-0000-000000000000"
            ? "Guest"
            : params.row.account}
        </Grid>
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
};

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<OrderRow[]>([]);

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
                  sx={{
                    "& .MuiDataGrid-virtualScrollerRenderZone": {
                      "& .MuiDataGrid-row": {
                        "&:nth-of-type(2n)": {
                          backgroundColor: "rgba(235, 235, 235, .7)",
                        },
                      },
                    },
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
