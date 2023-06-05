import { Navigate } from "react-router-dom";
import { userSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

export const AuthorizeUser = ({ children }) => {
  const user = useSelector(userSelector);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else {
    if (!user.email) {
      if (user.email === "") {
        return <Navigate to={"/login"} replace={true}></Navigate>;
      }
    }
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const user = useSelector(userSelector);
  const email = user.email;
  if (!email) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const ProtectRecover = ({ children }) => {
  const user = useSelector(userSelector);
  const email = user.email;
  if (!email) {
    return <Navigate to={"/password"} replace={true}></Navigate>;
  }
  return children;
};

export const ProtectRouteOTP = ({ children }) => {
  const user = useSelector(userSelector);
  const checkOTP = user.OTP;
  console.log("checkOTP", checkOTP);
  if (!checkOTP) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
