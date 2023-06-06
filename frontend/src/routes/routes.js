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

=======
<<<<<<< HEAD
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
=======
<<<<<<< HEAD
>>>>>>> 2ee3a9357b7d448950859d00a280310e743cf6c7
import ManageCourses from "../pages/components/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/AddNewCourse/AddNewCourse";
import UpdateCourse from "../pages/components/UpdateCourse/UpdateCourse";
import StaffManage from "../pages/components/StaffManage/StaffManage";
import Checkout from "../pages/components/Checkout/Checkout";
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
<<<<<<< HEAD

=======
>>>>>>> thienNH
>>>>>>> f650142d2379bd67919d386c75b54868fd3f0502
>>>>>>> 84c261148effb8feb325180a9e049c794aa79e67
>>>>>>> 2ee3a9357b7d448950859d00a280310e743cf6c7
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
    element: <Recovery></Recovery>,
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
