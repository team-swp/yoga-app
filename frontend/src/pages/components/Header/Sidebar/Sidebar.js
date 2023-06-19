import { useEffect, useState } from "react";
import { IconButton, Menu } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthGoogleContext";
import { userSelector } from "../../../../redux/selectors";
import { getAvatarToAWS } from "../../../../helper/loginAPI";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const cx = classNames.bind(styles);

function Sidebar() {
  const { logOut } = UserAuth();
  const [checkMember, setCheckMember] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleOpenUserMenu = (event) => {
    if (showMenu === false) {
      setAnchorElUser(event.currentTarget);
      setShowMenu(true);
    } else {
      setAnchorElUser(null);
      setShowMenu(false);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowMenu(false);
  };

  const handleLogout = () => {
    logOut();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector(userSelector);
  const loadImageAgain = async (e) => {
    if (user.avatar) {
      const { url } = await getAvatarToAWS({ imageName: user._id });
      e.target.src = url;
    }
  };
  useEffect(() => {
    if (user.meta_data) {
      const checkMem = JSON.parse(user.meta_data);
      setCheckMember(checkMem.isMember);
    }
  }, [user]);
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
        <div
          className={checkMember ? styles.bgImage : ""}
          style={{ cursor: "pointer" }}
        >
          <img
            src={user.avatar}
            className={` ${
              checkMember ? styles.profile_img : styles.profile_img_normal
            } object-cover h-44`}
            alt="avatar"
            onError={loadImageAgain}
          />
          {checkMember ? (
            <img
              src="https://fullstack.edu.vn/static/media/crown.8edf462029b3c37a7f673303d8d3bedc.svg"
              className={` ${styles.crown}`}
              alt="Member"
            />
          ) : (
            ""
          )}
        </div>
      </IconButton>
      <Menu
        sx={{
          mt: "80px",
          boxShadow: "none",
          cursor: "pointer",
          height: "500px",
          transform: "translateX(2%)",
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
            <div style={{ width: "350px" }}>
              <div
                style={{
                  boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
                  padding: "5px 0",
                  borderRadius: "10px",
                  margin: "-0px 10px",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/profile">
                  <div
                    style={{
                      flexBasis: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "auto 10px",
                      borderRadius: "10px",
                      textAlign: "center",
                      padding: "10px 0",
                    }}
                    className={styles.profile}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        marginRight: "3%",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                      className={checkMember ? styles.bgImage : ""}
                    >
                      <img
                        src={user.avatar}
                        className={` ${
                          checkMember
                            ? styles.profile_img_details
                            : styles.profile_img_details_normal
                        } object-cover h-44`}
                        alt="avatar"
                        onError={loadImageAgain}
                      />
                      {checkMember ? (
                        <img
                          src="https://fullstack.edu.vn/static/media/crown.8edf462029b3c37a7f673303d8d3bedc.svg"
                          className={` ${styles.crown}`}
                          alt="Member"
                        />
                      ) : (
                        ""
                      )}
                    </span>

                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      {user.username}
                    </span>
                  </div>
                </Link>
                <div
                  style={{
                    borderBottom: "2px solid #C4DFDF",
                    margin: "5px 20px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    flexBasis: "100%",
                    marginTop: "10px",
                    margin: "0 10px",
                    color: "blueviolet",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    padding: "10px 0",
                  }}
                  className={styles.profile}
                >
                  <div style={{ margin: "auto 0", marginLeft: "20px" }}>
                    {checkMember?'You are a member':'Become a member'}
                  </div>
                </div>
              </div>

              <Link to="/timetable">
                <div className={styles.sidebar_details}>
                  <CalendarMonthIcon className={styles.sidebar_details_icon} />
                  <div>Weekly Schedule</div>
                  <ArrowForwardIosOutlinedIcon
                    className={styles.sidebar_details_arrow}
                  />
                </div>
              </Link>

              <Link to="/courses">
                <div className={styles.sidebar_details}>
                  <SelfImprovementIcon
                    className={styles.sidebar_details_icon}
                  />
                  <div>Courses</div>
                  <ArrowForwardIosOutlinedIcon
                    className={styles.sidebar_details_arrow}
                  />
                </div>
              </Link>
              <Link to="/*">
                <div className={styles.sidebar_details}>
                  <NewspaperIcon className={styles.sidebar_details_icon} />
                  <div>News</div>
                  <ArrowForwardIosOutlinedIcon
                    className={styles.sidebar_details_arrow}
                  />
                </div>
              </Link>
              {user.role === "staff" && (
                <Link to="/staffmanage">
                  <div className={styles.sidebar_details}>
                    <HomeRepairServiceIcon
                      className={styles.sidebar_details_icon}
                    />
                    <div> Staff Manager</div>
                    <ArrowForwardIosOutlinedIcon
                      className={styles.sidebar_details_arrow}
                    />
                  </div>
                </Link>
              )}

              <Link to="/*">
                <div className={styles.sidebar_details}>
                  <HomeRepairServiceIcon
                    className={styles.sidebar_details_icon}
                  />
                  <div>Service</div>
                  <ArrowForwardIosOutlinedIcon
                    className={styles.sidebar_details_arrow}
                  />
                </div>
              </Link>
              <div>
                <div className={styles.sidebar_details} onClick={handleOpen}>
                  <LogoutIcon className={styles.sidebar_details_icon} />
                  <button>Logout</button>
                </div>

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
                    <div className={cx("modal-modal-button")}>
                      <a href="/">
                        <button
                          className={cx("modal-modal-button-yes")}
                          onClick={handleLogout}
                        >
                          Yes, Log Out
                        </button>
                      </a>

                      <div onClick={handleClose}>
                        <button className={cx("modal-modal-button-no")}>
                          No, Cancel
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        }
      </Menu>
    </div>
  );
}

export default Sidebar;
