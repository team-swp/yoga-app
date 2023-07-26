//get semester
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "https://yoga-app-swp.onrender.com";

// export const getSemester = await getApi({apiPath:`/api/semester/get`,errorMessage:'Cannot Get Semester'})
// export const addSemester = await addApi(data ,{apiPath:`/api/semester/add`,errorMessage:'Cannot Add Semester'})
export async function getSemester() {
  return await getApi({
    apiPath: `/api/semester/get`,
    errorMessage: "Cannot Get Semester",
  });
}

export async function addSemester(respone) {
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, {
    apiPath: `/api/semester/add`,
    errorMessage: "Cannot Add Semester",
  });
}
export async function updateSemester(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/semester/update`,
    errorMessage: "Cannot Update Semester",
  });
}
