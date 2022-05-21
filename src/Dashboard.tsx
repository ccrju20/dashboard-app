import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  Divider,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "./MenuDrawer/MenuItems";
import StorefrontIcon from "@mui/icons-material/Storefront";

export const ServiceContext = createContext({
  getTotalPending: () => {},
});

const drawerWidth: number = 210;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#00152B",
    color: "#FFF",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Dashboard = () => {
  const [pendingOrders, setPendingOrders] = useState(0);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getTotalPending = () => {
    axios.get("api/v1/dashboard/pending").then((res) => {
      // console.log(res);
      setPendingOrders(res.data);
    });
  };

  useEffect(() => {
    getTotalPending();
  }, []);

  const serviceContext = {
    getTotalPending: getTotalPending,
    pendingOrders: pendingOrders,
  };

  return (
    <ServiceContext.Provider value={serviceContext}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
                backgroundColor: "#001D3A",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <Tooltip title="Orders Pending">
                <IconButton color="inherit">
                  <Badge badgeContent={pendingOrders} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Box mt={2.5} mb={1}>
              <StorefrontIcon />
            </Box>
            <Divider style={{ background: "lightgrey" }} variant="middle" />
            <Box mt={5}>
              <List component="nav">
                <ListItems />
              </List>
            </Box>
            <Toolbar
              sx={{
                marginTop: "auto",
                backgroundColor: "#001D3A",
                alignItems: "center",
                justifyContent: "center",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                {open ? (
                  <ChevronLeftIcon
                    fontSize="large"
                    style={{ color: "lightgrey" }}
                  />
                ) : (
                  <ChevronRightIcon
                    fontSize="large"
                    style={{ color: "lightgrey" }}
                  />
                )}
              </IconButton>
            </Toolbar>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </ServiceContext.Provider>
  );
};

export default Dashboard;
