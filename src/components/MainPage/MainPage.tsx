import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";

const MainPage = () => {
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
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              Today's Date
            </Paper>
          </Grid>

          {/* Metric */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              Metric
            </Paper>
          </Grid>

          {/* Metric */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              Metric
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
