import axios from "axios";
import { getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";
//authen func
export async function authenticate(email) {
  try {
    return await axios.post("/api/authenticate", { email });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

//Member manegement

export async function getMember() {
  return await getApi({
    apiPath: `/api/accounts`,
    errorMessage: "Cannot Get Members",
  });
}

/** get User details */
export async function getUser({ id }) {
  try {
    const { data } = await axios.get(`/api/accounts/${id}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

export async function getUserByToken() {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get("/api/accessToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" + error });
  }
}

export async function sendMail({ username, email, text, subject }) {
  try {
    const { data } = await axios.post("/api/registerMail", {
      username,
      userEmail: email,
      text,
      subject
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Cannot Send Email...!" });
  }
}
/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/accounts/register`, credentials);
    console.log("msg", msg);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
// export async function verifyPassword({ email, password }){
//     try {
//         if(email){
//             const { data } = await axios.post('/api/accounts/login', { email, password })
//             return Promise.resolve({ data });
//         }
//     } catch (error) {
//         return Promise.reject({ error : "Password doesn't Match...!"})
//     }
// }

export async function verifyPassword({ email, password }) {
  //sửa lại phần này dùng callback hàm lồng dễ hơn
  try {
    if (email) {
      const { data } = await axios.post("/api/accounts/login", {
        email,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.patch("/api/accounts", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" + error });
  }
}

export async function updateUserPass(response) {
  try {
    console.log(response);
    const token = localStorage.getItem("token");
    const data = await axios.patch("/api/accountsPassword", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" + error });
  }
}

export async function updateUserForStaff(response) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.patch("/api/staff/account/update", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" + error });
  }
}

/** generate OTP */
export async function generateOTP(email) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/genarateOTP", { params: { email } });

    // send mail with the OTP
    if (status === 201) {
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username: "Recovery Password",
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ email, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { email, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ email, password }) {
  try {
    const { data, status } = await axios.put("/api/accounts/resetpassword", {
      email,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/*
Handle Image
*/

export async function postAvatarToAWS(formData) {
  try {
    const { data, status } = await axios.post("api/image/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}
export async function getPasswordCurr() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "api/password",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { data };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function getAvatarToAWS({ imageName }) {
  try {
    const { data } = await axios.get("api/image/get", {
      params: { imageName },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyTokenGoogle(tokenID) {
  try {
    const { data } = await axios.post("api/google/verify", {
      authToken: tokenID,
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error });
  }
}
