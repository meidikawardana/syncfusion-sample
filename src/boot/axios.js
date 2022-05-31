import Vue from "vue";
import axios from "axios";

let axiosInstance = axios;

axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API,
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
