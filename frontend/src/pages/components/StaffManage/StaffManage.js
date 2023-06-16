import { Box, Tab, Tabs, Typography } from "@mui/material";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PropTypes from "prop-types";
import { useState } from "react";
import ManageMember from "./ManageMember/ManageMember";
import ManageSchedule from "./ManageSchedule/ManageSchedule";
import ManageSemester from "./MangeSemester/ManageSemester";
import ManageCourses from "./ManageCourses/ManageCourses";
import ManageClass from "./ManageClass/ManageClass";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

<<<<<<< HEAD

const cx = classNames.bind(styles);

function StaffManage() {

    return (<div>
        <Header />
        <div class="bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
                <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
                    WELL COME BACK STAFF MANAGE
                </h1>
            </div>
        </div>
        <Container className={cx("class-container")}>
            <div
                className={cx("nav")}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 className={cx("li")} style={{ margin: "0" }}>
                    <Link to="/manageclass">Manage Class</Link>
                </h1>
                <h1 className={cx("li")} style={{ margin: "0", marginLeft: "20px" }}>
                    <Link to="/manageschedule">Manage Schedule</Link>
                </h1>
                <h1 className={cx("li")} style={{ margin: "0", marginLeft: "20px" }}>
                    <Link to="/managecourse">Manage Course</Link>
                </h1>
                <h1 className={cx("li")} style={{ margin: "0", marginLeft: "20px" }}>
                    <Link to="/managesemester">Manage Semester</Link>
                </h1>
            </div>
        </Container>
        <div className={cx("courses-img-yoga2")}>
            <img src={yoga2} alt="yoga2" />
        </div>
        <Footer />
    </div>);
=======
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StaffManage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Header />
      <div className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            STAFF MANAGER
          </h1>
        </div>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Manage Semester" {...a11yProps(0)} />
            <Tab label="Manage Course" {...a11yProps(1)} />
            <Tab label="Manage Class" {...a11yProps(2)} />
            <Tab label="Manage Schedule" {...a11yProps(3)} />
            <Tab label="Manage Member" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {<ManageSemester />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {<ManageCourses />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {<ManageClass />}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {<ManageSchedule />}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {<ManageMember />}
        </TabPanel>
      </Box>

      <Footer />
    </div>
  );
}

export default StaffManage;
