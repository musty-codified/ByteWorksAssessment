import axios from "axios";
const baseUrl = "http://localhost:8888/api/v1/";

//No slash between baseurl and path
export const apiPost = (path, data) => {
    return axios.post(`${baseUrl}${path}`, data);
};

export const apiGet = (path) => {
    return axios.get(`${baseUrl}${path}`);
};

export const apiGetAuthorization = (path) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("signature")}`,
      },
    };
  
    return axios.get(`${baseUrl}${path}`, config);
}