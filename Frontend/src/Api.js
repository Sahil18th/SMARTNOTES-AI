import axios from "axios";

const API = axios.create({
  baseURL: "https://smartnotes-backend-facn.onrender.com/",            //http://localhost:3000,              
  withCredentials: true
});

export default API;