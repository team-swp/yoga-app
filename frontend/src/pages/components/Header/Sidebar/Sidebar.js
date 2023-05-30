import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.css";

const settings = ["Profile", "Account", "Dashboard", "FAQS", "Logout"];

const cx = classNames.bind(styles);

function Sidebar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowMenu(false);
  };

  return (
    <>
      <IconButton
        disableRipple
        onClick={handleOpenUserMenu}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 3 }}
      >
        {showMenu ? (
          <ClearIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </IconButton>
      <Menu
        sx={{
          mt: "50px",
          boxShadow: "none",
        }}
        anchorEl={anchorElUser}
        id="menu-appbar"
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
        <div className={cx("sidebar")} onClick={handleCloseUserMenu}>
          <ul>
            {settings.map((setting) => (
              <li key={setting}>{setting}</li>
            ))}
          </ul>
        </div>
      </Menu>
    </>
  );
}

export default Sidebar;
