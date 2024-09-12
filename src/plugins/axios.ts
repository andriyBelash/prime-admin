import type { AxiosResponseError } from "@/types/base";
import axios from "axios";
import { toast } from "vue3-toastify";

const baseURL = 'http://localhost:3000/api/admin'

const http = axios.create({
  baseURL,

  headers: {
    ["Content-Type"]: "application/json",
  },

});

http.interceptors.response.use(function (res) {

  if(res.status === 201) return Promise.resolve(res)
  return Promise.resolve(res)


}, function (error) {

  if(error.response.data) {
    const data: AxiosResponseError = error.response?.data
    if(data.errors) {
      data.errors.forEach((item) => {
        toast(`${item.path}: ${item.msg}`, {
          "type": "error",
          "position": "bottom-center",
          "autoClose": 2000,
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      })
    } else if(data.message) {
      toast(data.message, {
        "type": "error",
        "position": "bottom-center",
        "autoClose": 2000,
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    }
  }

return Promise.reject(error);
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http


