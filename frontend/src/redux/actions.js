export const registerUserAction = (data) => {
  return {
    type: "user/register",
    payload: data,
  };
};

export const addUserLogin = (data) => {
  return {
    type: "login/addUser",
    payload: data,
  };
};

export const logOutNormal = (data) => {
  return {
    type: "logout",
    payload: data,
  };
};

export const setDataLogin = (data) => {
  return {
    type: "login/setDataLogin",
    payload: data,
  };
};

export const setActionOTP = (data) => {
  return {
    type: "login/setOTP",
    payload: data,
  };
};

export const updateData = (data) => {
  return {
    type: "login/updateData",
    payload: data,
  };
};

<<<<<<< HEAD
export const setDataBooking = (data) => {
  return {
    type: "booking/setData",
    payload: data,
  };
};
=======
export const setCourseId = (courseId) => ({
  type: "set_course_id",
  payload: { courseId },
});
>>>>>>> 92ae264d2dc2cca7f79b6e7ad08e381ec52c5c93
