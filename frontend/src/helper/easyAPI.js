import axios from "axios";
// Make API req
axios.defaults.baseURL = "http://localhost:3001";

export async function getApi({ apiPath, errorMessage }) {
  try {
    const { data } = await axios.get(apiPath);
    return { data };
  } catch (error) {
    return { error: errorMessage };
  }
}

export async function addApi(response, { apiPath, errorMessage }) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.post(apiPath, response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: errorMessage + error });
  }
}

export async function addApiNotToken(response, { apiPath, errorMessage }) {
  try {
    const data = await axios.post(apiPath, response);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: errorMessage + error });
  }
}

export async function updateApi(response, { apiPath, errorMessage }) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.patch(apiPath, response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: errorMessage + error });
  }
}
