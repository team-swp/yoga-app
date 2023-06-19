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
  courses: [{}],
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
<<<<<<< HEAD
<<<<<<< HEAD
      const { _id, token, username, phone, avatar, email, meta_data, role } =
        action.payload;
      if (!localStorage.getItem("token")) {
=======
      const { _id, token, username, phone, avatar,email,meta_data,role} = action.payload;
      if(!localStorage.getItem('token')){
>>>>>>> thienNH
=======
      const { _id, token, username, phone, avatar, email, meta_data, role } =
        action.payload;
      if (!localStorage.getItem("token")) {
>>>>>>> thienNH
        localStorage.setItem("token", token);
      }
      return {
        ...state,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> thienNH
        user: {
          ...state.user,
          _id,
          username,
          phone,
          avatar,
          email,
          meta_data,
          role,
        },
<<<<<<< HEAD
=======
        user: { ...state.user, _id, username, phone, avatar,email ,meta_data,role},
>>>>>>> thienNH
=======
>>>>>>> thienNH
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
      return {
        ...state,
        user: { ...state.user, OTP },
      };
    }
    case "logout": {
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
      };
    }

    case "set_course_id": {
      const { courseId } = action.payload;
      localStorage.setItem("courseId", courseId);
      return { ...state, courseId };
    }
    case "payment/premiumData": {
      const {premium_id,paymentAmount} = action.payload
      return { ...state ,
      premium:{premium_id,paymentAmount}
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
