import { useEffect, useState } from "react";
import { IconButton, Menu } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthGoogleContext";
import { userSelector } from "../../../../redux/selectors";
import { getAvatarToAWS, updateUser } from "../../../../helper/loginAPI";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import {FcApproval, FcLike, FcLink} from 'react-icons/fc'
import { setDataLogin } from "../../../../redux/actions";
import profileDefault from '../../../../assets/profile.png'
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
  const navigate = useNavigate();
  const { logOut } = UserAuth();
  const [checkMember, setCheckMember] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [memberDate, setMemberDate] = useState(null);
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

  const handleBecomeMember = () => {
    navigate("/premium");
  };

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const loadImageAgain = async (e) => {
    if (user.avatar) {
      const { url } = await getAvatarToAWS({ imageName: user._id });
      e.target.src = url;
      const result = updateUser({ avatar: url });
      result
        .then((data) => {
          dispatch(setDataLogin(data.data.data));
        })
        .catch(() => {
          console.log("error");
        });
    }
  };
  useEffect(() => {
    const test = async () => {
      if (user.avatar) {
        const { url } = await getAvatarToAWS({ imageName: user._id });
        setFile(url);
        console.log(url);
        const result = updateUser({ avatar: url });
        result
          .then((data) => {
            dispatch(setDataLogin(data.data.data));
          })
          .catch(() => {
            console.log("error");
          });
      }
    };
    test();
  }, []);

  useEffect(() => {
    if (user.meta_data) {
      const checkMem = JSON.parse(user.meta_data);
      setCheckMember(checkMem.isMember);
      const duration = checkMem.MemberDuration;
      const dateOld = new Date(checkMem.startDateMember);
      dateOld.setMonth(dateOld.getMonth() + parseInt(duration));
      const day = dateOld.getDate();
      const month = dateOld.getMonth() + 1;
      const year = dateOld.getFullYear();
      setMemberDate(`${day}/${month}/${year}`);
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
            src={file || user.avatar||profileDefault}
            className={` ${checkMember ? styles.profile_img : styles.profile_img_normal
              } object-cover h-44`}
            alt="avatar"
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
                        src={user.avatar||profileDefault}
                        className={` ${checkMember
                            ? styles.profile_img_details
                            : styles.profile_img_details_normal
                        } object-cover h-44`}
                        alt="avatar"
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
                ></div>
                {user.role === "user" && (
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
                    onClick={handleBecomeMember}
                  >
                    <div style={{ margin: "auto 0", marginLeft: "20px",color:'#E97777' }}>
                      {checkMember
                        ?<div style={{display:'flex' ,alignItems:'center' , gap:5}}><Typography fontSize={'17px'}  align="center">Membership Expires: {memberDate}</Typography><FcApproval style={{fontSize:'20px'}}/></div>
                        : <div style={{display:'flex' ,alignItems:'center' , gap:5}}><Typography color={'#98A8F8'} fontSize={'20px'} align="center">Become A Part Of Us</Typography><FcLike style={{fontSize:'24px'}}/></div>}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/schedule">
                <div className={styles.sidebar_details}>
                  <CalendarMonthIcon className={styles.sidebar_details_icon} />
                  <div>Schedule</div>
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
              <Link to="/premium">
                <div className={styles.sidebar_details}>
                  <StarIcon className={styles.sidebar_details_icon} />
                  <div>Premium</div>
                  <ArrowForwardIosOutlinedIcon
                    className={styles.sidebar_details_arrow}
                  />
                </div>
              </Link>

              {user.role === "staff" && (
                <Link to="/staffmanage">
                  <div className={styles.sidebar_details}>
                    <BadgeIcon className={styles.sidebar_details_icon} />
                    <div> Staff Manager</div>
                    <ArrowForwardIosOutlinedIcon
                      className={styles.sidebar_details_arrow}
                    />
                  </div>
                </Link>
              )}
              {user.role === "instructor" && (
                <Link to="/teachschedule">
                  <div className={styles.sidebar_details}>
                    <SchoolIcon className={styles.sidebar_details_icon} />
                    <div>Teaching Schedule</div>
                    <ArrowForwardIosOutlinedIcon
                      className={styles.sidebar_details_arrow}
                    />
                  </div>
                </Link>
              )}

              {user.role === "admin" && (
                <div>
                  <Link to="/admin">
                    <div className={styles.sidebar_details}>
                      <AdminPanelSettingsIcon
                        className={styles.sidebar_details_icon}
                      />
                      <div>User Manager</div>
                      <ArrowForwardIosOutlinedIcon
                        className={styles.sidebar_details_arrow}
                      />
                    </div>
                  </Link>
                  <Link to="/dashboard">
                    <div className={styles.sidebar_details}>
                      <EqualizerIcon className={styles.sidebar_details_icon} />
                      <div>Dashboard</div>
                      <ArrowForwardIosOutlinedIcon
                        className={styles.sidebar_details_arrow}
                      />
                    </div>
                  </Link>
                </div>
              )}

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
