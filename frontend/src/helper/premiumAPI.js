//get semester
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getPremium() {
  return await getApi({
    apiPath: `/api/premium/get`,
    errorMessage: "Cannot Get Course",
  });
}

export async function addPremium(respone) {
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, {
    apiPath: `/api/premium/add`,
    errorMessage: "Cannot Add Course",
  });
}
export async function updatePremium(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/premium/update`,
    errorMessage: "Cannot Update Course",
  });
}

export async function updateNews(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/news/update`,
    errorMessage: "Cannot Update Course",
  });
}

export async function addNews(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await addApi(respone, {
    apiPath: `/api/news/add`,
    errorMessage: "Cannot Update Course",
  });
}

export async function getNews() {
  return await getApi({
    apiPath: `/api/news/get`,
    errorMessage: "Cannot Get Course",
  });
}
