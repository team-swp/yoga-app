import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "login",
  initialState: {
    _id: "",
    username: "",
    email: "",
    role: "user",
    phone: "",
    avatar: "",
    OTP: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload;
    },
    setDataLogin: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("token", token);
      state=action.payload
    },
    updateData:(state, action)=>{
      state=action.payload
    },
    setOTP:(state,action)=>{
      state=action.payload
      
    }
  },
});
