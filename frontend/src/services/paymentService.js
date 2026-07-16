import API from "./api";

// Create Payment
export const createPayment = (data) => {
  return API.post("/api/payment", data);
};

// Get Payment History
export const getPaymentHistory = () => {
  return API.get("/api/payment/history");
};

// Get Payment By ID
export const getPaymentById = (id) => {
  return API.get(`/api/payment/${id}`);
};