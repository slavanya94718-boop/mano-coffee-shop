import axios from "axios";

const API = axios.create({
  baseURL: "https://mano-coffee-shop-1.onrender.com//api",
});

export default API;
