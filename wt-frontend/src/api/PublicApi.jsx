import axios from "axios";

const api = axios.create({
  baseURL: "http://deti-engsoft-09/api",
  Headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) =>
  api.post("/users/authenticate", { email, password });

export const companySignUp = (data) => api.post("/companies/sign-up", data);

export const emailTest = (data) => api.post("/mailer/test", data);

export const register = (data) => api.post("/users/register", data);

export const getPersonalInfo = (token) =>
  api.get("/users/personal", { headers: { Authorization: `Bearer ${token}` } });
