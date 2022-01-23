import axios from "axios";

const STRIPE_PUBLIC_KEY =
  "pk_test_51IGqrgLWKlSQ5z9eD9TXNONdwhmX7RIiGafQG5x4QMesA5vmCWhoZG1pzVEWaJN9PAXVd3UIlMmOJiRtiGfjsbXN00IlJ3Nl8w";
const api = axios.create({
  baseURL: "http://deti-engsoft-09:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});

export const getAllCompanies = () => api.get("/companies");

export const getUsedCompanies = () => api.get("/companies/used");

export const getPersonalTasks = () => api.get("/tasks/personal");

export const createTask = (data) => api.post("/tasks", data);

export const getTaskById = (id) => api.get("/tasks", { params: { id } });

export const deleteTask = (id) => api.delete("/tasks", { params: { id } });

export const startTask = (id) =>
  api.post("/tasks/start", null, { params: { id } });

export const getCurrentTask = () => api.get("/tasks/current");

export const checkout = () =>
  api.get("/payments/checkout", { params: { token: STRIPE_PUBLIC_KEY } });

export const sendEmailTestTemplate = (data) =>
  api.post("/mailer/test-template", data);
