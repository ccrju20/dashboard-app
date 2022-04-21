import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, DialogTitle, Divider, Box } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState({});

  const getTopSellers = () => {
    axios
      .get("api/v1/dashboard/pie")
      .then((res) => {
        console.log(res.data)
        setTopSellers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTopSellers();
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            sx={{ backgroundColor: "#3A003A", color: "lightgrey" }}
          >
            <DialogTitle>
              <Typography sx={{ fontSize: 16 }}>
                <ArrowCircleUpOutlinedIcon
                  sx={{ marginRight: 1, marginBottom: -0.5 }}
                />
                Top Sellers
              </Typography>
            </DialogTitle>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            content
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopSellers;
