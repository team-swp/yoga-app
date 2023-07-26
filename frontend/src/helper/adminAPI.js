//get semester
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "https://yoga-app-swp.onrender.com";

// export const getSemester = await getApi({apiPath:`/api/semester/get`,errorMessage:'Cannot Get Semester'})
// export const addSemester = await addApi(data ,{apiPath:`/api/semester/add`,errorMessage:'Cannot Add Semester'})

export async function updateUserForAdmin(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, {
    apiPath: `/api/admin/update`,
    errorMessage: "Cannot Update User",
  });
}
