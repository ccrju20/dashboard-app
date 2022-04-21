import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [productData, setProductData] = useState({});

  const getData = () => {
    axios
      .get("api/v1/dashboard/pie")
      .then((res) => {
        console.log(res);
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const options: any = {
    plugins: {
      legend: {
        position: "left",
        maxWidth: 150,
      },
    },
  };

  const data = {
    labels: Object.keys(productData),
    datasets: [
      {
        data: Object.values(productData),
        backgroundColor: [
          "#8FDDE7",
          "#FAE8E0",
          "#B6E2D3",
          "#D8A7B1",
          "#C38370",
          "#D3BBDD",
          "#C4AE78",
          "#EFE7D3",
          "#ECE3F0",
          "#FFF4BD",
          "#F4B9B8",
          "#887BB0",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Box mt={2}>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
          Products Sold (Past 7 Days)
        </Typography>
      </Box>
      <Pie data={data} options={options} />
    </>
  );
};

export default PieChart;
