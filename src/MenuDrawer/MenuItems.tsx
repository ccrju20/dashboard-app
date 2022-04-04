import * as React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CakeIcon from "@mui/icons-material/Cake";

const MenuItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton
        sx={{ marginBottom: 2 }}
        onClick={() => {
          navigate("/");
        }}
      >
        <ListItemIcon>
          <ShowChartIcon style={{ color: "lightgrey" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        sx={{ marginBottom: 2 }}
        onClick={() => {
          navigate("/products");
        }}
      >
        <ListItemIcon>
          <CakeIcon style={{ color: "lightgrey" }} />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>

      <ListItemButton
        sx={{ marginBottom: 2 }}
        onClick={() => {
          navigate("/orders");
        }}
      >
        <ListItemIcon>
          <ShoppingBasketIcon style={{ color: "lightgrey" }} />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>

      <ListItemButton
        sx={{ marginBottom: 2 }}
        onClick={() => {
          navigate("/users");
        }}
      >
        <ListItemIcon>
          <PeopleIcon style={{ color: "lightgrey" }} />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MenuItems;
