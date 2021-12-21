import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  Headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});
