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
  ProtectRouteCheckout,
  ProtectRouteOTP,
} from "../middleware/auth";
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
import StaffManage from "../pages/components/StaffManage/StaffManage";
import AddNewClass from "../pages/components/StaffManage/ManageClass/AddNewClass";
import UpdateClass from "../pages/components/StaffManage/ManageClass/UpdateClass";
import ManageAddSchedule from "../pages/components/StaffManage/ManageSchedule/ManageAddSchedule";
import ManageEditSchedule from "../pages/components/StaffManage/ManageSchedule/ManageEditSchedule";
import ManageCourses from "../pages/components/StaffManage/ManageCourses/ManageCourses";
import AddNewCourse from "../pages/components/StaffManage/ManageCourses/AddNewCourse";
import UpdateCourse from "../pages/components/StaffManage/ManageCourses/UpdateCourse";
import ManageAddSemester from "../pages/components/StaffManage/MangeSemester/ManageAddSemester";
<<<<<<< .merge_file_rS1EHC
import Premium from "../pages/components/MemberPacket/Premium";
import ManageMember from "../pages/components/StaffManage/ManageMember/ManageMember";
import ManageUpdateSemester from "../pages/components/StaffManage/MangeSemester/ManageUpdateSemester";
import AdminHome from "../pages/components/Admin/AdminHome";

import AddNewPremium from "../pages/components/StaffManage/ManagePremium/AddNewPremium";
import UpdatePremiumPack from "../pages/components/StaffManage/ManagePremium/UpdatePremiumPack";
import CourseItems from "../pages/components/Courses/CourseItems";
import Dashboard from "../pages/components/DashBoard/Dashboard";
=======
import ManageUpdateSemester from "../pages/components/StaffManage/MangeSemester/ManageUpdateSemester";
import ManageMember from "../pages/components/StaffManage/ManageMember/ManageMember";

>>>>>>> .merge_file_lfVN2C

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
    path: "/courseitem",
    element: <CourseItems></CourseItems>,
  },
  {
    path: "/course",
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
    path: "/paymentstatus",
<<<<<<< .merge_file_rS1EHC
    element: <PaymentStatus />,
=======
    element: (
      <PaymentStatus />
    ),
>>>>>>> .merge_file_lfVN2C
  },
  {
    path: "/checkout",
    element: (
      <ProtectRouteCheckout>
        {" "}
        <Checkout />
      </ProtectRouteCheckout>
    ),
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
    element: (
      <ProtectRoute>
        <StaffManage />
      </ProtectRoute>
    ),
  },

  { path: "/managemember", element: <ManageMember /> },
  {
    path: "/addnewclass",
    element: (
      <ProtectRoute>
        <AddNewClass />
      </ProtectRoute>
    ),
  },
  {
    path: "/updateclass/:id",
    element: (
      <ProtectRoute>
        <UpdateClass />
      </ProtectRoute>
    ),
  },

  {
    path: "/addnewschedule",
    element: (
      <ProtectRoute>
        <ManageAddSchedule />
      </ProtectRoute>
    ),
  },
  {
    path: "/updateschedule/:id",
    element: (
      <ProtectRoute>
        <ManageEditSchedule />
      </ProtectRoute>
    ),
  },
  {
    path: "/addnewcourse",
    element: (
      <ProtectRoute>
        <AddNewCourse />
      </ProtectRoute>
    ),
  },
  {
    path: "/updatecourse/:id",
    element: (
      <ProtectRoute>
        <UpdateCourse />
      </ProtectRoute>
    ),
  },
  {
    path: "/addnewsemester",
<<<<<<< .merge_file_rS1EHC
    element: (
      <ProtectRoute>
        <ManageAddSemester />
      </ProtectRoute>
    ),
  },
  {
    path: "/updatesemester/:id",
    element: (
      <ProtectRoute>
        <ManageUpdateSemester />
      </ProtectRoute>
    ),
  },
  {
    path: "/premium",
    element: <Premium></Premium>,
  },
  {
    path: "/admin",
    element: (
      <ProtectRoute>
        <AdminHome />
      </ProtectRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/addnewpremium",
    element: <AddNewPremium></AddNewPremium>,
  },
  {
    path: "/updatepremiumpack/:id",
    element: <UpdatePremiumPack></UpdatePremiumPack>,
=======
    element: <ManageAddSemester></ManageAddSemester>
  },
  {
    path: "/updatesemester/:id",
    element: <ManageUpdateSemester></ManageUpdateSemester>
>>>>>>> .merge_file_lfVN2C
  },
]);

export default routers;
