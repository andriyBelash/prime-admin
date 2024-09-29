import axios from "axios";
import { toast } from "vue3-toastify";
import { AuthServices } from "@/api/Auth";
import type { AxiosResponseError } from "@/types/base";

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


}, async function (error) {

  const status = error.response.status
  if(status === 401 && error.response.data && error.response.data.message === 'Invalid Token') {
    try {
      const refresh = localStorage.getItem('refresh_token') as string
      const res = await AuthServices.refreshToken({ token: refresh })
      const data = res.data
      localStorage.setItem('refresh_token', data['refresh_token'])
      localStorage.setItem('access_token', data['access_token'])
      window.location.href = location.href
    } catch (e) {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error);
  }
  if(error.response.data) {
    const data: AxiosResponseError = error.response?.data
    if(data.errors) {
      data.errors.forEach((item) => {
        toast(`${item.path}: ${item.msg}`, {
          "type": "error",
          "position": "bottom-right",
          "autoClose": 2000,
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      })
    } else if(data.message) {
      if(Array.isArray(data.message)) {
        for(const message of data.message) {
          toast(message, {
            "type": "error",
            "position": "bottom-right",
            "autoClose": 2000,
            "transition": "slide",
            "dangerouslyHTMLString": true
          })
        }
      } else {
        toast(data.message, {
          "type": "error",
          "position": "bottom-center",
          "autoClose": 2000,
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      }
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


