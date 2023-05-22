import { useEffect } from "react";
import { registerUser, verifyPassword } from "../helper/loginAPI";

const initState = {
  user: {
    _id: "",
    username: "",
    email: "",
    role: "user",
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
    case "login/verifypassword": {
      const { email, password } = action.payload;
      let loginPromise = verifyPassword({ email, password });
      return loginPromise
        .then((res) => {
          let { token } = res.data;
          localStorage.setItem("token", token);
          const newState = {
            ...state,
            user: {
              ...state.user,
              _id: res.data._id,
              username: res.data.username,
            },
          };
          state = {};
          state = Object.assign({}, newState);
        })
        .catch((res) => {
          const newState = {
            ...state,
            user: {
              ...state.user,
              _id: res.data._id,
              username: res.data.username,
            },
          };
          state = {};
          state = Object.assign({}, newState);
        });
      // hàm bị bất đòng bộ về sửa
      // tạo 1 async func nhét nó vào lưu await return về 1 biến promise
      // return (async function getData() {
      //   const { email, password } = action.payload;
      //   let { data } = await verifyPassword({ email, password });//dính lỗi chỗ này dùng promise là đẹp
      //   let newState = {};
      //   if (data) {
      //     let token = data.token;
      //     localStorage.setItem("token", token);
      //     newState = {
      //       ...state,
      //       user: { ...state.user, _id: data._id, username: data.username },
      //       page_uri:'/profile'
      //     };
      //   } else {
      //     newState = {
      //       ...state,
      //       user: { ...state.user, email: "" },
      //       page_uri:'/'
      //     };
      //   }
      //   return newState;
      // })();
    }
    default:
      return state;
  }
};

export default rootReducer;
