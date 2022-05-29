import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { closeReason } from "../Interfaces/IDialog";
import { IUser } from "../Interfaces/IUser";
import { IOrder } from "../Interfaces/IOrder";
import {
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";
import UserInfo from "./UserInfo";
import UserOrders from "./UserOrders";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ReportIcon from "@mui/icons-material/Report";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rows, setRows] = useState<IUser[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userOpen, setUserOpen] = useState(false);
  const [userOrdersOpen, setUserOrdersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({} as any);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  const getUsers = () => {
    axios
      .get("api/v1/auth/users")
      .then((res) => {
        // console.log(res);
        let theUsers = res.data;
        setUsers(theUsers);
        setRows(
          theUsers.map((user: IUser) => ({
            id: user.id,
            email: user.email,
            uuid: user.uuid,
            createdAt: user.createdAt,
            contactInfo: user.contactInfo,
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
    getUsers();
  }, []);

  const handleUserOpen = (user: IUser): void => {
    setSelectedUser(user);
    setUserOpen(true);
  };

  const handleUserClose = (value: closeReason): void => {
    setUserOpen(false);
  };

  const handleUserOrdersOpen = (user: IUser): void => {
    axios.get(`api/v1/orders/account/${user.uuid}`).then((res) => {
      // console.log(res);
      setUserOrders(res.data);
    });

    setSelectedUser(user);
    setUserOrdersOpen(true);
  };
  const handleUserOrdersClose = (value: closeReason): void => {
    setUserOrdersOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      width: 90,
      renderCell: (params) => {
        const userInitials = `${params.row.contactInfo.firstname.charAt(
          0
        )}${params.row.contactInfo.lastname.charAt(0)}`;
        return (
          <Grid container justifyContent="center">
            <Avatar sx={{ width: 30, height: 30 }}>
              <Typography variant="body2"> {userInitials}</Typography>
            </Avatar>
          </Grid>
        );
      },
    },
    {
      field: "email",
      headerName: "Account",
      width: 190,
      renderCell: (params) => {
        return (
          <Typography variant="body2" color="primary.main">
            {params.row.email}
          </Typography>
        );
      },
    },
    {
      field: "uuid",
      headerName: "UUID",
      width: 320,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 220,
    },
    {
      field: "contactInfo",
      headerName: "Contact Info",
      width: 160,
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center">
            <Button
              onClick={() => {
                handleUserOpen(params.row);
              }}
            >
              View Info
            </Button>
          </Grid>
        );
      },
    },
    {
      field: "orderHistory",
      headerName: "Order History",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              handleUserOrdersOpen(params.row);
            }}
          >
            Orders
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <UserInfo open={userOpen} close={handleUserClose} user={selectedUser} />
      <UserOrders
        open={userOrdersOpen}
        close={handleUserOrdersClose}
        user={selectedUser}
        userOrders={userOrders}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" color="text.secondary">
          <PeopleOutlineIcon
            fontSize="large"
            sx={{ marginBottom: -0.5, marginRight: 1 }}
          />
          Users
        </Typography>

        <Grid container justifyContent="center" mt={2}>
          {isLoading && !loadError ? (
            <Box sx={{ display: "flex" }} mt={5}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 650, width: "100%" }}>
              {loadError ? (
                <>
                  <Box mt={3}>
                    <Typography variant="h5">
                      <ReportIcon
                        fontSize="large"
                        sx={{ marginBottom: -1, marginRight: 1 }}
                      />
                      Error loading users
                    </Typography>
                  </Box>
                </>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
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

export default Users;
