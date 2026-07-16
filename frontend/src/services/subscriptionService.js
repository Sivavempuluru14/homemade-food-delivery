import API from "./api";

// Create Subscription
export const createSubscription = (subscriptionData) => {
  return API.post("/api/subscriptions", subscriptionData);
};

// Get All Subscriptions
export const getSubscriptions = () => {
  return API.get("/api/subscriptions");
};

// Get Subscription By ID
export const getSubscriptionById = (id) => {
  return API.get(`/api/subscriptions/${id}`);
};