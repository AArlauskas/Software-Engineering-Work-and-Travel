import axios from "axios";

const STRIPE_PUBLIC_KEY =
  "pk_test_51IGqrgLWKlSQ5z9eD9TXNONdwhmX7RIiGafQG5x4QMesA5vmCWhoZG1pzVEWaJN9PAXVd3UIlMmOJiRtiGfjsbXN00IlJ3Nl8w";
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});

export const getAllCompanies = () => api.get("/companies");

export const getPersonalTasks = () => api.get("/tasks/personal");

export const checkout = () =>
  api.get("/payments/checkout", { params: { token: STRIPE_PUBLIC_KEY } });
