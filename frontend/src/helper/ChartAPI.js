
import axios from "axios";
import { addApi, getApi, updateApi } from "./easyAPI";

export async function getPaymentChart(respone){
  return await addApi(respone||{},{apiPath:`/api/chart/payments`,errorMessage:'Cannot Get Payment Chart'}) 
}

export async function getUserPercent(respone){
  return await addApi(respone||{},{apiPath:`/api/chart/customer`,errorMessage:'Cannot Get Account Chart'}) 
}

export async function getProductPercent(respone){
  return await addApi(respone||{},{apiPath:`/api/chart/product`,errorMessage:'Cannot Get Product Chart'}) 
}

export async function getMemberSparkLine(respone){
  return await addApi(respone||{},{apiPath:`/api/chart/members`,errorMessage:'Cannot Get Product Chart'}) 
}

export async function getPremiumLine(respone){
  return await addApi(respone||{},{apiPath:`/api/chart/premium`,errorMessage:'Cannot Get Product Chart'}) 
}