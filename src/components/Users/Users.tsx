import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../Interfaces/IUser";
import {
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rows, setRows] = useState<IUser[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = () => {
    axios
      .get("api/v1/auth/users")
      .then((res) => {
        console.log(res);
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
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
      width: 170,
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center">
            <Button
              onClick={() => {
                console.log(params.row.contactInfo);
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
                console.log(params.row.uuid);
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Users</h1>

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
