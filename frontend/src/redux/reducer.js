import { useEffect } from "react";
import { registerUser, verifyPassword } from "../helper/loginAPI";

const initState = {
  user: {
    _id: "",
    username: "",
    email: "",
    role: "user",
    phone: "",
    avatar: "",
    OTP: false,
  },
  courses: [
    {
      id: 1,
      name: "Learn Yoga",
      completed: false,
      priority: "Medium",
    },
    {
      id: 2,
      name: "Learn Yoga Test",
      completed: true,
      priority: "High",
    },
  ],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "user/register":
      // registerUser(action.payload)
      //làm sau
      //đã làm ở ngay bên trang resgitewr
      break;

    case "login/addUser": {
      const { email } = action.payload;
      let newState = {};
      newState = {
        ...state,
        user: { ...state.user, email },
      };
      return newState;
    }

    case "login/setDataLogin": {
      const { _id, token, username, phone, avatar } = action.payload;
      localStorage.setItem("token", token);
      return {
        ...state,
        user: { ...state.user, _id, username, phone, avatar },
      };
    }
    case "login/updateData": {
      const { username, phone, avatar } = action.payload;
      return {
        ...state,
        user: { ...state.user, username, phone, avatar },
      };
    }
    case "login/setOTP": {
      const { OTP } = action.payload;
      if (OTP === false) {
        localStorage.removeItem("email");
      }
      console.log(OTP);
      return {
        ...state,
        user: { ...state.user, OTP },
      };
    }
    case "logout": {
      return {
        ...state,
        user: {},
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
