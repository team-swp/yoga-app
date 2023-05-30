//get semester 
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getCourse(){
  return await getApi({apiPath:`/api/course/get`,errorMessage:'Cannot Get Course'}) 
}

export async function addCourse(respone){
//respone là 1 object nhận giá trị cần để add, add thì ko cần id
 return await addApi(respone ,{apiPath:`/api/course/add`,errorMessage:'Cannot Add Course'})
}
export async function updateCourse(respone){
 //respone là object chứa attribute cần updat, update thì cần
 return await updateApi(respone ,{apiPath:`/api/course/update`,errorMessage:'Cannot Update Course'})

}
