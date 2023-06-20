import { addApi } from "./easyAPI";

//  const { username, userEmail, text, subject } = req.body;
//
export async function sendMail(respone) {
  //respone là 1 object nhận giá trị cần để add, add thì ko cần id
  return await addApi(respone, {
    apiPath: `/api/registerMail`,
    errorMessage: "Cannot Add Payment",
  });
}