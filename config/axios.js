import axios from "axios";

const clientAxios = axios.create({
  baseURL: process.env.backendUrl,
});

export default clientAxios;
