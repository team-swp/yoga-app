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
import WeeklyTimetable from "../pages/components/WeeklySchedule/WeeklySchedule";
import CourseDetail from "../pages/components/CourseDetail/CourseDetail";
import {
  AuthorizeUser,
  ProtectRoute,
  ProtectRouteOTP,
} from "../middleware/auth";
<<<<<<< HEAD

import PaymentStatus from "../pages/components/Checkout/PaymentStatus";

=======
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
import ManageCourses from "../pages/components/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/AddNewCourse/AddNewCourse";
import UpdateCourse from "../pages/components/UpdateCourse/UpdateCourse";
import StaffManage from "../pages/components/StaffManage/StaffManage";
<<<<<<< HEAD
import Checkout from "../pages/components/Checkout/Checkout";

=======
<<<<<<< HEAD

=======
import AddNewClass from "../pages/components/AddNewClass/AddNewClass";
import UpdateClass from "../pages/components/UpdateClass/UpdateClass";
import ManageSchedule from "../pages/components/Schedule/ManageSchedule";
import ManageAddSchedule from "../pages/components/Schedule/ManageAddSchedule";
import ManageEditSchedule from "../pages/components/Schedule/ManageEditSchedule";
import ManageClass from "../pages/components/ManageClass/ManageClass";
>>>>>>> 1fb10a6f977a830aadb169df9851e05e7cc53ed5
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/courses",
    element: <Courses></Courses>,
  },
  {
    path: "/course/:id",
    element: <CourseDetail></CourseDetail>,
  },
  {
    path: "/timetable",
    element: <WeeklyTimetable />,
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
<<<<<<< HEAD
    element: <Recovery></Recovery>,
=======

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
    element: (<PaymentStatus />)
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
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
    element: <ManageClass></ManageClass>
  },
  {
    path: "/addnewclass",
    element: <AddNewClass></AddNewClass>
  },
  {
    path: "/updateclass/:id",
    element: <UpdateClass></UpdateClass>
  },
  {
    path: "/schedule",
    element: <ManageSchedule></ManageSchedule>
  },
  {
    path: "/addnewschedule",
    element: <ManageAddSchedule></ManageAddSchedule>
  },
  {
    path: "/updateschedule/:id",
    element: <ManageEditSchedule></ManageEditSchedule>
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
    element: <UpdateCourse></UpdateCourse>,
  },
]);

export default routers;
