//get semester
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getPayment() {
  return await getApi({
    apiPath: `/api/payment/get`,
    errorMessage: "Cannot Get Payment",
  });
}
export async function getPaymentUserByID() {
  return await getApi({
    apiPath: `/api/getpayment/user`,
    errorMessage: "Cannot Get Payment",
  });
}

export async function addPayment(respone) {
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, {
    apiPath: `/api/payment/add`,
    errorMessage: "Cannot Add Payment",
  });
}
export async function updatePayment(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/payment/update`,
    errorMessage: "Cannot Update Payment",
  });
}

export async function getPaymentWithPaging() {
  let apiPath = `/api/paymentsPaging/get?limit=99999999`;

  return await getApi({
    apiPath,
    errorMessage: "Cannot Get Booking",
  });
}

export async function createVnpay(respone) {
  try {
    const { data } = await axios.post(`/api/create_payment_url`, respone);
    return { data };
  } catch (error) {
    return { error: "Cannot open link...!" };
  }
}

export async function runUrlVnpay(respone) {
  try {
    const { data } = await axios.post(`/api/runUrlVnPAY`, respone);
    return { data };
  } catch (error) {
    return { error: "Cannot open link...!" };
  }
}

export async function getPaymentByID({ id }) {
  try {
    const { data } = await axios.get(`/api/payment/get/${id}`);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Payment cannot Found...!" });
  }
}

export async function getPaymentByIDUser() {
  try {
   const data =  await getApi({
      apiPath:`/api/getpayment/user`,
      errorMessage: "Cannot Get Booking",
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Payment cannot Found...!" });
  }
}