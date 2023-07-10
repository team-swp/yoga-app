import { Link } from "react-router-dom";
import logo from "../../../../Heartbeat.svg";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selectors";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

function Navigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ margin: "2px 0 0 5px" }}>HEARTBEAT</p>
        </div>
      </Typography>
      <Divider />
      <List>
        <Link to="/courses">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/premium">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Premium" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/schedule">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Schedule" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/weather">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Weather" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/news">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="News" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const user = useSelector(userSelector);
  const token = localStorage.getItem("token");
  useEffect(() => {}, [user]);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="m-0 mx-20 flex justify-between items-center">
        <div className="flex ml-14 gap-4 justify-items-center items-center ">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="hidden md:block" style={{ transform: "scale(1.6)" }}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex gap-6 ml-8 hidden md:flex">
            <div>
              <Link to="/courses">
                <p className="text-xs uppercase">Courses</p>
              </Link>
            </div>
            <div>
              <Link to="/premium">
                <p className="text-xs uppercase">Premium</p>
              </Link>
            </div>
            <div>
              <Link to="/schedule">
                <p className="text-xs uppercase">Schedule</p>
              </Link>
            </div>
            <div>
              <Link to="/weather">
                <p className="text-xs uppercase">Weather</p>
              </Link>
            </div>
            <div>
              <Link to="/news">
                <p className="text-xs uppercase">News</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          {token ? (
            <Sidebar />
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-black font-bold mr-8 py-2 px-4 rounded-full border border-black hover:bg-black hover:text-white focus:outline-none focus:border-black focus:shadow-outline-black transition duration-150 ease-in-out">
                  Log In
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </header>
  );
}
export default Navigation;
