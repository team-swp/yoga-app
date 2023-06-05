//get semester 
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getSchedule(){
  return await getApi({apiPath:`/api/schedule/get`,errorMessage:'Cannot Get Schedule'}) 
}

export async function addSchedule(respone){
//respone là 1 object nhận giá trị cần để add, add thì ko cần id
 return await addApi(respone ,{apiPath:`/api/schedule/add`,errorMessage:'Cannot Add Schedule'})
}
export async function updateSchedule(respone){
 //respone là object chứa attribute cần updat, update thì cần
 return await updateApi(respone ,{apiPath:`/api/schedule/update`,errorMessage:'Cannot Update Schedule'})

}

