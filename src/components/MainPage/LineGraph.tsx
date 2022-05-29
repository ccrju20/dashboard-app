import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ReportIcon from "@mui/icons-material/Report";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const [salesData, setSalesData] = useState({});
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    axios
      .get("api/v1/dashboard/line")
      .then((res) => {
        // console.log(res);
        setSalesData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Revenue (Past 5 Days)",
      },
    },
  };

  const labels = Object.keys(salesData);

  const data = {
    labels,
    datasets: [
      {
        label: "USD",
        data: salesData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {isLoading && !loadError ? (
        <Grid container justifyContent="center" mt={5} mb={5}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {loadError ? (
            <>
              <Box mt={2}>
                <Typography
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                  color="text.secondary"
                >
                  Daily Revenue (Past 5 Days)
                </Typography>
              </Box>
              <Box mt={5} mb={5}>
                <Typography variant="h6">
                  <ReportIcon sx={{ marginBottom: -0.5, marginRight: 1 }} />
                  Error loading
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Line options={options} data={data} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default LineGraph;
