import { Navigate } from "react-router-dom";
import { userSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = useSelector(userSelector);
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  } else {
    if (!user.email) {
      if (user.email === "") {
        return <Navigate to={"/"} replace={true}></Navigate>;
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

export const ProtectRouteOTP = ({ children }) => {
  const user = useSelector(userSelector);
  const checkOTP = user.OTP;
  console.log("checkOTP", checkOTP);
  if (!checkOTP) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
