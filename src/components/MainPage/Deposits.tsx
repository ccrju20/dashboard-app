import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReportIcon from "@mui/icons-material/Report";

const Deposits = () => {
  const [deposits, setDeposits] = useState();
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getTodaysDeposits = () => {
    axios
      .get("api/v1/dashboard/today")
      .then((res) => {
        // console.log(res);
        setDeposits(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getTodaysDeposits();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            sx={{
              backgroundColor: "#003A3A",
              color: "lightgrey",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <DialogTitle>
              <Typography sx={{ fontSize: 16 }}>
                <PointOfSaleIcon
                  sx={{ marginRight: 1.5, marginBottom: -0.5 }}
                />
                Deposits
              </Typography>
            </DialogTitle>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isLoading && !loadError ? (
            <Grid container justifyContent="center" mt={5}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              {loadError ? (
                <>
                  <Box mt={5}>
                    <Typography variant="h6">
                      <ReportIcon sx={{ marginBottom: -0.5, marginRight: 1 }} />
                      Error loading
                    </Typography>
                  </Box>
                </>
              ) : (
                <Grid container justifyContent="center" wrap="nowrap">
                  <AttachMoneyIcon
                    sx={{
                      fontSize: 80,
                      color: "#1D3A00",
                      marginRight: -2,
                      marginTop: 3,
                    }}
                  />
                  <Typography
                    noWrap
                    color="#1D3A00"
                    variant="h4"
                    mt={5}
                    sx={{ letterSpacing: 2 }}
                  >
                    {deposits === 0 ? "0.00" : deposits}
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Deposits;
