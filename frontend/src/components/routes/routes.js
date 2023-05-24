import { createBrowserRouter } from "react-router-dom";
import Home from "../../components/pages/Home/Home";
import PageNotFound from "../../components/pages/Login/PageNotFound";
import Password from "../../components/pages/Login/Password";
import Recovery from "../../components/pages/Login/Recovery";
import Register from "../../components/pages/Login/Register";
import Reset from "../../components/pages/Login/Reset";
import Username from "../../components/pages/Login/Username";
import Profile from "../../components/pages/Profile/Profile";
import {
  AuthorizeUser,
  ProtectRoute,
  ProtectRouteOTP,
} from "../../middleware/auth";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
]);

export default routers;
