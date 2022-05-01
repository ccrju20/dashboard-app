import React from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  DialogTitle,
  Divider,
  Box,
} from "@mui/material";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import Deposits from "./Deposits";
import TopSellers from "./TopSellers";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";

const MainPage = () => {
  const month = new Date().toLocaleString("default", { month: "short" });
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const dayOfWeek = new Date().toLocaleString("default", { weekday: "long" });

  return (
    <>
      <h1>Main</h1>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Today */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                height: 200,
                borderRadius: 10,
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{
                      backgroundColor: "#00376D",
                      color: "lightgrey",
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40,
                    }}
                  >
                    <DialogTitle>
                      <Typography sx={{ fontSize: 16 }}>
                        <CalendarMonthTwoToneIcon
                          sx={{ marginRight: 1, marginBottom: -0.5 }}
                        />
                        {dayOfWeek}
                      </Typography>
                    </DialogTitle>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      container
                      justifyContent="flex-end"
                      mt={3}
                    >
                      <Typography
                        sx={{ fontSize: 16 }}
                        color="text.secondary"
                        variant="overline"
                      >
                        {month}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-start">
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 60 }}
                        ml={1}
                      >
                        {day}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box justifyContent="center">
                <Typography
                  sx={{ letterSpacing: 3 }}
                  color="text.secondary"
                  variant="h6"
                >
                  <Divider> {year}</Divider>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Today's Sales */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                height: 200,
                borderRadius: 10,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>

          {/* Metric */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                height: 200,
                borderRadius: 10,
              }}
            >
              <TopSellers />
            </Paper>
          </Grid>
        </Grid>

        <br />

        <Grid container spacing={2}>
          {/* Sales */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 10,
              }}
            >
              <LineGraph />
            </Paper>
          </Grid>
          {/* Pie Chart */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                borderRadius: 10,
              }}
            >
              <PieChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
