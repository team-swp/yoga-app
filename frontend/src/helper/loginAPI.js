import axios from 'axios'
// Make API req
axios.defaults.baseURL = 'http://localhost:3001'
//authen func
export async function authenticate(email){
  try {
      return await axios.post('/api/authenticate', { email })
  } catch (error) {
      return { error : "Username doesn't exist...!"}
  }
}

/** get User details */
export async function getUser({id}){
  try {
      const { data } = await axios.get(`/api/accounts/${id}`);
      return { data };
  } catch (error) {
      return { error : "Password doesn't Match...!"}
  }
}

/** register user function */
export async function registerUser(credentials){
  try {
    console.log(process.env.REACT_APP_SERVER_DOMAIN);
      const { data : { msg }, status } = await axios.post(`/api/accounts/register`, credentials);
      console.log('msg',msg);

      let { username, email } = credentials;

      /** send email */
      if(status === 201){
          await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
      }

      return Promise.resolve(msg)
  } catch (error) {
      return Promise.reject({ error })
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

export async function verifyPassword({ email, password }){//sửa lại phần này dùng callback hàm lồng dễ hơn
    try {
        if(email){
            const { data } = await axios.post('/api/accounts/login', { email, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.patch('/api/accounts', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}
/** generate OTP */
export async function generateOTP(id){
    try {
        const { data : { username , email }} = await getUser({id});

        const {data : { code }, status } = await axios.get('/api/genarateOTP', { params : { email }});

        // send mail with the OTP
        if(status === 201){
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ email, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { email, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ email, password }){
    try {
        const { data, status } = await axios.put('/api/accounts/resetpassword', { email, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}