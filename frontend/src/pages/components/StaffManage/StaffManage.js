import { Box, Tab, Tabs, Typography } from "@mui/material";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ManageMember from "./ManageMember/ManageMember";
import ManageSchedule from "./ManageSchedule/ManageSchedule";
import ManageSemester from "./MangeSemester/ManageSemester";
import ManageCourses from "./ManageCourses/ManageCourses";
import ManageClass from "./ManageClass/ManageClass";
import ManagePackage from "./ManagePremium/ManagePackage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

  // Effect hook để load giá trị lưu trong localStorage
  useEffect(() => {
    const savedValue = localStorage.getItem("tabValue");
    if (savedValue) {
      setValue(parseInt(savedValue));
    }
  }, []);

  // Effect hook để lưu giá trị mới vào localStorage khi thay đổi state
  useEffect(() => {
    localStorage.setItem("tabValue", value);
  }, [value]);

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
            <Tab label="Manage Package" {...a11yProps(5)} />
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
        <TabPanel value={value} index={5}>
          {<ManagePackage />}
        </TabPanel>
      </Box>
      <Footer />
    </div>
  );
}

export default StaffManage;
