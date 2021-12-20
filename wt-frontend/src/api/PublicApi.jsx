import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  Headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) =>
  api.post("/users/authenticate", { email, password });
