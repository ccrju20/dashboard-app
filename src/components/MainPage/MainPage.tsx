import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import LineGraph from './LineGraph'
import PieChart from './PieChart'

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

          {/* Pie Chart */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
              }}
            >
              <PieChart/>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={3}
              sx={{
                padding: 2
              }}
            >
              <LineGraph/>
            </Paper>
          </Grid>

          {/* Metric */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              Metric
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
