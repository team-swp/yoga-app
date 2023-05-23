import * as React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./Sidebar.module.css";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Sidebar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setShowMenu(true);

    let start = performance.now();
    let animationEnded = false;

    function animate(time) {
      let timePassed = time - start;
      if (timePassed >= 300) {
        animationEnded = true;
        iconButtonRef.current.style.transform = "rotate(-90deg)";
        return;
      }

      const angle = (-90 * timePassed) / 300;
      iconButtonRef.current.style.transform = `rotate(${angle}deg)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowMenu(false);
    iconButtonRef.current.style.transform = "rotate(0)";
  };

  const handleIconMouseEnter = () => {
    setHovered(true);

    let start = performance.now();
    let animationEnded = false;

    function animate(time) {
      let timePassed = time - start;

      if (timePassed >= 300) {
        animationEnded = true;
        iconButtonRef.current.style.transform = "rotate(-90deg)";
        return;
      }

      const angle = (-90 * timePassed) / 300;
      iconButtonRef.current.style.transform = `rotate(${angle}deg)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  const handleIconMouseLeave = () => {
    setHovered(false);

    iconButtonRef.current.style.transform = "rotate(0)";
  };

  const iconButtonRef = React.useRef(null);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip>
        <IconButton
          disableRipple
          onClick={handleOpenUserMenu}
          onMouseEnter={handleIconMouseEnter}
          onMouseLeave={handleIconMouseLeave}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          className="IconButton"
          ref={iconButtonRef}
        >
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
          {showMenu ? (
            <ClearIcon sx={{ fontSize: "50px" }} />
          ) : hovered ? (
            <AddIcon sx={{ fontSize: "50px" }} />
          ) : (
            <MenuIcon sx={{ fontSize: "50px" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "58px",
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Sidebar;
