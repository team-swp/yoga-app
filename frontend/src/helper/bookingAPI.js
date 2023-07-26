//get semester
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "https://yoga-app-swp.onrender.com";

export async function getBooking() {
  return await getApi({
    apiPath: `/api/booking/get`,
    errorMessage: "Cannot Get Booking",
  });
}

export async function addBooking(respone) {
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, {
    apiPath: `/api/booking/add`,
    errorMessage: "Cannot Add Booking",
  });
}
export async function updateBooking(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/booking/update`,
    errorMessage: "Cannot Update Booking",
  });
}

export async function checkBooking() {
  //sửa lại phần này dùng callback hàm lồng dễ hơn
  try {
    const token = localStorage.getItem("token");
    const data = await axios.post(
      "/api/booking/check",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}
