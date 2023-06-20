//get semester 
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getClass() {
  return await getApi({ apiPath: `/api/class/get`, errorMessage: 'Cannot Get Class' })
}

export async function addClass(respone) {
  console.log(respone);
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, { apiPath: `/api/class/add`, errorMessage: 'Cannot Add Class' })
}
export async function updateClass(respone) {
  //respone là object chứa attribute cần updat, update thì cần
  return await updateApi(respone, { apiPath: `/api/class/update`, errorMessage: 'Cannot Update Class' })

}
