import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  Chip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { closeReason } from "../Interfaces/IDialog";
import { IOrder } from "../Interfaces/IOrder";
import OrderInfo from "./OrderInfo";
import OrderStatus from "./OrderStatus";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import ShoppingBasketIconOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import ReportIcon from "@mui/icons-material/Report";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [rows, setRows] = useState<IOrder[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>({} as any);
  const [statusOpen, setStatusOpen] = useState(false);
  const [arrOrderNums, setArrOrderNums] = useState<string[]>([]);
  const [ordersSelected, setOrdersSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState<IOrder[]>([]);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  const getOrders = () => {
    axios
      .get("api/v1/orders")
      .then((res) => {
        // console.log(res);
        let theOrders = res.data;
        setOrders(theOrders);
        setRows(
          theOrders?.map((order: IOrder) => ({
            id: order.id,
            ordernumber: order.ordernumber,
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
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleOrderOpen = (order: IOrder): void => {
    setSelectedOrder(order);
    setOrderOpen(true);
  };

  const handleOrderClose = (value: closeReason): void => {
    setOrderOpen(false);
  };

  const handleStatusOpen = (order: IOrder): void => {
    if (ordersSelected) {
      return;
    }
    setSelectedOrder(order);
    setStatusOpen(true);
  };

  const handleStatusClose = (value: closeReason): void => {
    setStatusOpen(false);
  };

  useEffect(() => {
    setOrdersSelected(selectionModel.length !== 0);
    setArrOrderNums(
      selectedRows.map((o: any) => {
        return o.ordernumber;
      })
    );
  }, [selectedRows, selectionModel]);

  const handleSelectedOrders = (ids: any) => {
    const selectedIDs = new Set(ids);
    setSelectedRows(rows.filter((row: any) => selectedIDs.has(row.id)));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "ordernumber",
      headerName: "Order Number",
      width: 125,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            onClick={() => {
              handleOrderOpen(params.row);
              console.log(params.row);
            }}
          >
            {params.row.ordernumber}
          </Button>
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
              return "warning";
            case "CONFIRMED":
              return "primary";
            case "SHIPPED":
              return "secondary";
            case "COMPLETE":
              return "success";
            case "CANCELED":
              return "error";
            case "REFUNDED":
              return "error";
          }
        };
        return (
          <Chip
            label={params.row.status}
            color={handleColor(params.row.status)}
            size="small"
            onClick={() => {
              handleStatusOpen(params.row);
            }}
          />
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
          <Grid container justifyContent="center">
            <Chip
              label={params.row.scheduled}
              variant="outlined"
              color={params.row.scheduled === "ASAP" ? "warning" : "secondary"}
            />
          </Grid>
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
          <Grid container justifyContent="center">
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
                color="info"
                label="Delivery"
                icon={<DirectionsCarOutlinedIcon />}
              />
            )}
          </Grid>
        );
      },
    },
    {
      field: "account",
      headerName: "Account",
      width: 290,
      headerAlign: "center",
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
  ];

  return (
    <>
      <OrderInfo
        open={orderOpen}
        close={handleOrderClose}
        order={selectedOrder}
        getOrders={getOrders}
      />
      <OrderStatus
        open={statusOpen}
        close={handleStatusClose}
        order={selectedOrder}
        orderNumbers={arrOrderNums}
        getOrders={getOrders}
        setSelectedRows={setSelectedRows}
        setSelectionModel={setSelectionModel}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">
          <ShoppingBasketIconOutlined
            fontSize="large"
            sx={{ marginBottom: -0.5, marginRight: 1 }}
          />
          Orders
        </Typography>
        <Grid container mb={3} spacing={1}>
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Button
                disabled={!ordersSelected}
                variant="outlined"
                onClick={() => {
                  setStatusOpen(true);
                }}
              >
                Change Statuses
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent={{ xs: "center", sm: "flex-end" }}>
              <Chip
                label={`Orders Pending: ${
                  orders.filter((order) => order.status === "PENDING").length
                }`}
                color="primary"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          {isLoading && !loadError ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 650, width: "100%" }}>
              {loadError ? (
                <>
                  <Typography variant="h5">
                    <ReportIcon
                      fontSize="large"
                      sx={{ marginBottom: -1, marginRight: 1 }}
                    />
                    Error loading orders
                  </Typography>
                </>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  disableSelectionOnClick
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "datePosted", sort: "desc" }],
                    },
                  }}
                  onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection);
                    handleSelectedOrders(newSelection);
                  }}
                  selectionModel={selectionModel}
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
