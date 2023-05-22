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

export const verifyPassword =  (data) => {
  return {
    type: "login/verifypassword",
    payload: data,
  }
}