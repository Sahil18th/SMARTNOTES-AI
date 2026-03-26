import axios from "axios";

const API = axios.create({
  baseURL: "https://smartnotes-backend-facn.onrender.com/",                         
  withCredentials: true
});

export default API;