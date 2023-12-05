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

export const apiDelete = (path) => {
  return axios.delete(`${baseUrl}${path}`);
};

export const apiDeleteAuthorization = (path) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("signature")}`,
    },
  };

  return axios.delete(`${baseUrl}${path}`, config);
};

export const apiPut = (path,data) => {
  const config = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("signature")}`
      }
  }
  return axios.put(`${baseUrl}${path}`, data, config);
};