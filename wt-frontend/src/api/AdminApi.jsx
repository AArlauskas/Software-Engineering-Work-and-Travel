import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});

export const getLogs = () => api.get("/logs");

export const getLogTypes = () => api.get("/logs/types");
