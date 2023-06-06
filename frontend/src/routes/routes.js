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
import Checkout from "../pages/components/Checkout/Checkout";
import WeeklySchedule from "../pages/components/WeeklySchedule/WeeklySchedule";
import {
  AuthorizeUser,
  ProtectRecover,
  ProtectRoute,
  ProtectRouteOTP,
} from "../middleware/auth";
<<<<<<< HEAD
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
=======
<<<<<<< HEAD
import ManageCourses from "../pages/components/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/AddNewCourse/AddNewCourse";
import UpdateCourse from "../pages/components/UpdateCourse/UpdateCourse";
import StaffManage from "../pages/components/StaffManage/StaffManage";
=======
<<<<<<< HEAD
=======
import Checkout from "../pages/components/Checkout/Checkout";
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
>>>>>>> thienNH
>>>>>>> f650142d2379bd67919d386c75b54868fd3f0502
>>>>>>> 84c261148effb8feb325180a9e049c794aa79e67
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
    element: <Password />,
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
    path:"/paymentstatus",
    element:(<PaymentStatus/>)
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/staffmanage",
    element: <StaffManage></StaffManage>
  },
  {
    path: "/managecourse",
    element: <ManageCourses></ManageCourses>
  },
  {
    path: "/addnewcourse",
    element: <AddNewCourse></AddNewCourse>
  },
  {
    path: "/updatecourse/:id",
    element: <UpdateCourse></UpdateCourse>
  }
]);

export default routers;
