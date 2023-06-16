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
<<<<<<< HEAD
import Premium from "../pages/components/MemberPacket/Premium";
=======
import ManageMember from "../pages/components/StaffManage/ManageMember/ManageMember";
>>>>>>> 6b641d5edf87807a001ca60acc54d7e461734b15

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
    element: (
     <PaymentStatus/>
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
  { path: "/managemember", element: <ManageMember /> },
  {
    path: "/addnewclass",
    element: <AddNewClass></AddNewClass>,
  },
  {
    path: "/updateclass/:id",
    element: <UpdateClass></UpdateClass>,
  },
  {
    path: "/manageschedule",
    element: <ManageSchedule></ManageSchedule>,
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
    element: <UpdateCourse></UpdateCourse>,
  },
  {
    path: "/managesemester",
    element: <ManageSemester></ManageSemester>,
  },
  {
    path: "/addnewsemester",
    element: <ManageAddSemester></ManageAddSemester>,
  },
  {
    path: "/premium",
    element: <Premium></Premium>,
  },
]);

export default routers;
