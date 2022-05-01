import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CakeIcon from "@mui/icons-material/Cake";
import { ListItem } from "@mui/material";

const MenuItems = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <>
      <ListItem sx={{ color: active === 1 ? "#008F91" : "lightgrey" }}>
        <ListItemButton
          onClick={() => {
            navigate("/");
            setActive(1);
          }}
        >
          <ListItemIcon>
            <ShowChartIcon
              style={{ color: active === 1 ? "#008F91" : "lightgrey" }}
            />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItemButton>
      </ListItem>

      <ListItem sx={{ color: active === 2 ? "#008F91" : "lightgrey" }}>
        <ListItemButton
          onClick={() => {
            navigate("/products");
            setActive(2);
          }}
        >
          <ListItemIcon>
            <CakeIcon
              style={{ color: active === 2 ? "#008F91" : "lightgrey" }}
            />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </ListItem>

      <ListItem sx={{ color: active === 3 ? "#008F91" : "lightgrey" }}>
        <ListItemButton
          onClick={() => {
            navigate("/orders");
            setActive(3);
          }}
        >
          <ListItemIcon>
            <ShoppingBasketIcon
              style={{ color: active === 3 ? "#008F91" : "lightgrey" }}
            />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </ListItem>

      <ListItem sx={{ color: active === 4 ? "#008F91" : "lightgrey" }}>
        <ListItemButton
          onClick={() => {
            navigate("/users");
            setActive(4);
          }}
        >
          <ListItemIcon>
            <PeopleIcon
              style={{ color: active === 4 ? "#008F91" : "lightgrey" }}
            />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default MenuItems;
