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
import InsctructorSchedule from "../pages/components/WeeklySchedule/InstructorSchedule";
import {
  AuthorizeUser,
  ProtectRecover,
  ProtectRoute,
  ProtectRouteAdmin,
  ProtectRouteCheckout,
  ProtectRouteOTP,
  ProtectRouteStaff,
} from "../middleware/auth";
import PaymentStatus from "../pages/components/Checkout/PaymentStatus";
import StaffManage from "../pages/components/StaffManage/StaffManage";
import AddNewClass from "../pages/components/StaffManage/ManageClass/AddNewClass";
import UpdateClass from "../pages/components/StaffManage/ManageClass/UpdateClass";
import ManageAddSchedule from "../pages/components/StaffManage/ManageSchedule/ManageAddSchedule";
import ManageEditSchedule from "../pages/components/StaffManage/ManageSchedule/ManageEditSchedule";
import AddNewCourse from "../pages/components/StaffManage/ManageCourses/AddNewCourse";
import UpdateCourse from "../pages/components/StaffManage/ManageCourses/UpdateCourse";
import ManageAddSemester from "../pages/components/StaffManage/MangeSemester/ManageAddSemester";
import ManageUpdateSemester from "../pages/components/StaffManage/MangeSemester/ManageUpdateSemester";
import ManageUpdatePackage from "../pages/components/StaffManage/ManagePremium/UpdatePremiumPack";

import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "../pages/components/DashBoard/pages";

import {
  Cart,
  Chat,
  Notification,
  UserProfile,
} from "../pages/components/DashBoard/components";
import Dashboard from "../pages/components/DashBoard/Dashboard";
import Admin from "../pages/components/Admin/AdminHome";
import Premium from "../pages/components/MemberPacket/Premium";
import Weather from "../pages/components/Weather/components/Weather";
import UpdateNews from "../pages/components/StaffManage/ManageNews/UpdateNews";

import AddNewPremium from "../pages/components/StaffManage/ManagePremium/AddNewPremium";
import UpdatePremiumPack from "../pages/components/StaffManage/ManagePremium/UpdatePremiumPack";

import Contact from "../pages/components/Contact/Contact";

import NewsList from "../pages/components/NotificationNew/NewsList";


import ConfettieEffect from "../pages/components/AnimationEffect/ConfettieEffect";


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
    path: "/course",
    element: <CourseDetail></CourseDetail>,
  },
  {
    path: "/schedule",
    element: <WeeklySchedule />,
  },
  {
    path: "/teachschedule",
    element: <InsctructorSchedule />,
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
    element: <PaymentStatus />,
  },
  {
    path: "/checkout",
    element: (
      <ProtectRouteCheckout>
        <Checkout />
      </ProtectRouteCheckout>
    ),
  },
  {
    path: "/premium",
    element: <Premium />,
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
      <ProtectRouteStaff>
        <StaffManage />
      </ProtectRouteStaff>
    ),
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
    path: "/addnewschedule",
    element: <ManageAddSchedule></ManageAddSchedule>,
  },
  {
    path: "/updateschedule/:id",
    element: <ManageEditSchedule></ManageEditSchedule>,
  },

  {
    path: "/addnewcourse",
    element: <AddNewCourse></AddNewCourse>,
  },
  {
    path: "/updatecourse/:id",
    element: <UpdateCourse></UpdateCourse>,
  },

  {
    path: "/addnewsemester",
    element: <ManageAddSemester></ManageAddSemester>,
  },
  {
    path: "/updatesemester/:id",
    element: <ManageUpdateSemester></ManageUpdateSemester>,
  },
  {
    path: "/addnewpremium",
    element: <AddNewPremium />,
  },
  {
    path: "/updatepremiumpack/:id",
    element: <UpdatePremiumPack />,
  },
  {
    path: "/updatesenews/:id",
    element: <UpdateNews></UpdateNews>,
  },
  {
    path: "/ecommerce",
    element: <Ecommerce></Ecommerce>,
  },
  {
    path: "/orders",
    element: <Orders></Orders>,
  },
  {
    path: "/employees",
    element: <Employees></Employees>,
  },
  {
    path: "/customers",
    element: <Customers></Customers>,
  },
  {
    path: "/kanban",
    element: <Kanban></Kanban>,
  },
  {
    path: "/editor",
    element: <Editor></Editor>,
  },
  {
    path: "/calendar",
    element: <Calendar></Calendar>,
  },
  {
    path: "/color-picker",
    element: <ColorPicker></ColorPicker>,
  },
  {
    path: "/line",
    element: <Line></Line>,
  },
  {
    path: "/area",
    element: <Area></Area>,
  },
  {
    path: "/bar",
    element: <Bar></Bar>,
  },
  {
    path: "/pie",
    element: <Pie></Pie>,
  },
  {
    path: "/financial",
    element: <Financial></Financial>,
  },
  {
    path: "/color-mapping",
    element: <ColorMapping></ColorMapping>,
  },
  {
    path: "/pyramid",
    element: <Pyramid></Pyramid>,
  },
  {
    path: "/stacked",
    element: <Stacked></Stacked>,
  },
  {
    path: "/stacked",
    element: <Stacked></Stacked>,
  },
  {
    path: "/cart",
    element: <Cart></Cart>,
  },
  {
    path: "/chat",
    element: <Chat></Chat>,
  },
  {
    path: "/notification",
    element: <Notification></Notification>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRouteAdmin>
        <Dashboard />
      </ProtectRouteAdmin>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectRouteAdmin>
        <Admin />
      </ProtectRouteAdmin>
    ),
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/addnewpremium",
    element: <AddNewPremium />,
  },
  {
    path: "/updatepremiumpack/:id",
    element: <UpdatePremiumPack />,
  },
  {
    element:<NewsList/>,
    path:'/news'
  },
  

  // {
  //   element:<Detail/>,
  //   path:'/news'
  // },


  { path: "/contact", element: <Contact /> },

  { path: "/effect", element: <ConfettieEffect /> },

]);

export default routers;
