import React from "react";
import { Grid, Paper, Container } from "@mui/material";

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

          {/* Sales */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              Line Chart
            </Paper>
          </Grid>

          {/* Produce Pie */}
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
              Pie Chart
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
