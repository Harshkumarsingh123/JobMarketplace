import axios from "axios";

const API = "http://localhost:8080/api/payments";

const authHeader = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

export const createOrderApi = (jobId) =>
  axios.post(`${API}/create-order/${jobId}`, {}, { headers: authHeader() });

export const verifyPaymentApi = (data) =>
  axios.post(`${API}/verify`, data, { headers: authHeader() });
