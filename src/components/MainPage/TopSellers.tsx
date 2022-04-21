import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState({});

  const getTopSellers = () => {
    axios
      .get("api/v1/dashboard/pie")
      .then((res) => {
        console.log(res.data);
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
            <List sx={{ marginTop: 1.5, marginLeft: 1, padding: 0 }}>
              <ListItem sx={{ padding: 0.5 }}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    fontSize: 30,
                    bgcolor: "#6D006D",
                  }}
                >
                  1
                </Avatar>
                <Typography color="#3A001D" variant="body2" sx={{marginLeft: 1, letterSpacing: 2}}>
                  {Object.keys(topSellers)[0]}
                </Typography>
              </ListItem>

              <ListItem sx={{ padding: 0.5 }}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    fontSize: 25,
                    bgcolor: "#6D006D",
                  }}
                >
                  2
                </Avatar>
                <Typography color="#3A001D" variant="body2" sx={{marginLeft: 1, letterSpacing: 2}}>
                  {Object.keys(topSellers)[1]}
                </Typography>
              </ListItem>

              <ListItem sx={{ padding: 0.5 }}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    fontSize: 21,
                    bgcolor: "#6D006D",
                  }}
                >
                  3
                </Avatar>
                <Typography color="#3A001D" variant="body2" sx={{marginLeft: 1, letterSpacing: 2}}>
                  {Object.keys(topSellers)[2]}
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopSellers;
