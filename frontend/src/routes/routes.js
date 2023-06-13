import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/components/Home/Home";
import PageNotFound from "../pages/components/Login/PageNotFound";
import Password from "../pages/components/Login/Password";
import Recovery from "../pages/components/Login/Recovery";
import Register from "../pages/components/Login/Register";
import Reset from "../pages/components/Login/Reset";
import Username from "../pages/components/Login/Username";
import Profile from "../pages/components/Profile/Profile";
import Courses from "../pages/components/Courses/Courses";
import CourseDetail from "../pages/components/CourseDetail/CourseDetail";

import WeeklySchedule from "../pages/components/WeeklySchedule/WeeklySchedule";

import {
  AuthorizeUser,
  ProtectRecover,
  ProtectRoute,
  ProtectRouteOTP,
} from "../middleware/auth";
<<<<<<< HEAD
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
import StaffManage from "../pages/components/StaffManage/StaffManage";
import ManageClass from "../pages/components/StaffManage/ManageClass/ManageClass";
import AddNewClass from "../pages/components/StaffManage/ManageClass/AddNewClass";
import UpdateClass from "../pages/components/StaffManage/ManageClass/UpdateClass";
import ManageSchedule from "../pages/components/StaffManage/ManageSchedule/ManageSchedule";
import ManageAddSchedule from "../pages/components/StaffManage/ManageSchedule/ManageAddSchedule";
import ManageEditSchedule from "../pages/components/StaffManage/ManageSchedule/ManageEditSchedule";
import ManageCourses from "../pages/components/StaffManage/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/StaffManage/ManageCourses/AddNewCourse";
import UpdateCourse from "../pages/components/StaffManage/ManageCourses/UpdateCourse";
import ManageSemester from "../pages/components/StaffManage/MangeSemester/ManageSemester";
import ManageAddSemester from "../pages/components/StaffManage/MangeSemester/ManageAddSemester";







=======
import ManageCourses from "../pages/components/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/AddNewCourse/AddNewCourse";
import UpdateCourse from "../pages/components/UpdateCourse/UpdateCourse";
import StaffManage from "../pages/components/StaffManage/StaffManage";

import PaymentStatus from "../pages/components/Checkout/PaymentStatus";

import Checkout from "../pages/components/Checkout/Checkout";

import AddNewClass from "../pages/components/AddNewClass/AddNewClass";
import UpdateClass from "../pages/components/UpdateClass/UpdateClass";
import ManageSchedule from "../pages/components/Schedule/ManageSchedule";
import ManageAddSchedule from "../pages/components/Schedule/ManageAddSchedule";
import ManageEditSchedule from "../pages/components/Schedule/ManageEditSchedule";
import ManageClass from "../pages/components/ManageClass/ManageClass";
>>>>>>> ef9cf68ab873de8c8f3c8c9e4266e802db3001f6
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/course",
    element: <CourseDetail />,
  },
  {
    path: "/timetable",
    element: <WeeklySchedule />,
  },
  {
    path: "/login",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/reset",
    element: (
      <ProtectRouteOTP>
        <Reset />
      </ProtectRouteOTP>
    ),
  },
  {
    path: "/recovery",

    element: (
      <ProtectRecover>
        <Recovery />
      </ProtectRecover>
    ),
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/paymentstatus",
    element: <PaymentStatus />,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/staffmanage",
    element: <StaffManage></StaffManage>,
  },
  {
    path: "/manageclass",
    element: <ManageClass></ManageClass>,
  },
  {
    path: "/addnewclass",
    element: <AddNewClass></AddNewClass>,
  },
  {
    path: "/updateclass/:id",
    element: <UpdateClass></UpdateClass>,
  },
  {
<<<<<<< HEAD
    path: "/manageschedule",
    element: <ManageSchedule></ManageSchedule>
=======
    path: "/schedule",
    element: <ManageSchedule></ManageSchedule>,
>>>>>>> ef9cf68ab873de8c8f3c8c9e4266e802db3001f6
  },
  {
    path: "/addnewschedule",
    element: <ManageAddSchedule></ManageAddSchedule>,
  },
  {
    path: "/updateschedule/:id",
    element: <ManageEditSchedule></ManageEditSchedule>,
  },
  {
    path: "/managecourse",
    element: <ManageCourses></ManageCourses>,
  },
  {
    path: "/addnewcourse",
    element: <AddNewCourse></AddNewCourse>,
  },
  {
    path: "/updatecourse/:id",
<<<<<<< HEAD
    element: <UpdateCourse></UpdateCourse>
  },
  {
    path: "/managesemester",
    element: <ManageSemester></ManageSemester>
  },
  {
    path: "/addnewsemester",
    element: <ManageAddSemester></ManageAddSemester>
  }
=======
    element: <UpdateCourse></UpdateCourse>,
  },
>>>>>>> ef9cf68ab873de8c8f3c8c9e4266e802db3001f6
]);

export default routers;
