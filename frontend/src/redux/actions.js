export const registerUserAction = (data) => {
  return {
    type: "user/register",
    payload: data,
  }
}

export const addUserLogin = (data) => {
  return {
    type: "login/addUser",
    payload: data,
  }
}

export const setDataLogin =  (data) => {
  return {
    type: "login/setDataLogin",
    payload: data,
  }
}

export const updateData =  (data) => {
  return {
    type: "login/updateData",
    payload: data,
  }
}