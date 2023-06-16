import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { logOutNormal } from "../../../../redux/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthGoogleContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const cx = classNames.bind(styles);

function Sidebar() {
  const { logOut } = UserAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowMenu(false);
  };

  const handleLogout = () => {
    logOut();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
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
        {
          <div className={cx("sidebar")} onClick={handleCloseUserMenu}>
            <ul>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/timetable">
                <li>Weekly Schedule</li>
              </Link>
              <Link to="/staffmanage">
                <li>Staff Manage</li>
              </Link>
              <li>
                <Link to="/courses">
                  <button>Courses</button>
                </Link>
              </li>
              <li>
                <Link to="/*">
                  <button>News</button>
                </Link>
              </li>
              <li>
                <Link to="/*">
                  <button>Services</button>
                </Link>
              </li>
              <li onClick={handleOpen}>
                <button>Log Out</button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ mb: 5 }}
                    >
                      Are you sure you want to Log Out ?
                    </Typography>
                    <div
                      className={cx("modal-modal-button")}
                      onClick={handleLogout}
                    >
                      <button className={cx("modal-modal-button-yes")}>
                        <a href="/"> Yes, Log Out</a>
                      </button>
                      <button
                        className={cx("modal-modal-button-no")}
                        onClick={handleClose}
                      >
                        No, Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>
              </li>
            </ul>
          </div>
        }
      </Menu>
    </div>
  );
}

export default Sidebar;
