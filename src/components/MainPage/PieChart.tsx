import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [productData, setProductData] = useState({});

  useEffect(() => {
    axios
      .get("api/v1/orders/data")
      .then((res) => {
        console.log(res);
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: Object.keys(productData),
    datasets: [
      {
        label: "# of Votes",
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
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default PieChart;
