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

  const getData = () => {
    axios
      .get("api/v1/dashboard/line")
      .then((res) => {
        console.log(res);
        setSalesData(res.data);
      })
      .catch((err) => {
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
        text: "Sales Per Day (Past 5 Days)",
      },
    },
  };

  const labels = Object.keys(salesData);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales in USD",
        data: salesData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default LineGraph;
