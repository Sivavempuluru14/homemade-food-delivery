import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSubscription } from "../services/subscriptionService";
import "./OrderSummary.css";

function OrderSummary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Get selected plan
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

  if (!selectedPlan) {
    return (
      <div className="order-container">
        <h2>No Plan Selected</h2>
        <button
          className="payment-btn"
          onClick={() => navigate("/")}
        >
          Go to Subscription Plans
        </button>
      </div>
    );
  }

  const handleContinue = async () => {
    try {
      setLoading(true);

      const subscriptionData = {
        userId: user?._id || localStorage.getItem("userId"),
        planType: selectedPlan.planType,
        amount: selectedPlan.amount,
        lunchBoxCharge: selectedPlan.lunchBoxCharge,
        totalAmount: selectedPlan.totalAmount,
        paymentStatus: "Pending",
      };

      const response = await createSubscription(subscriptionData);

      console.log(response.data);

      // Save created subscription
      localStorage.setItem(
        "subscription",
        JSON.stringify(response.data)
      );

      navigate("/payment");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create subscription."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">

      <h1 className="order-title">
        Order Summary
      </h1>

      <div className="order-card">

        <div className="order-row">
          <span>Plan</span>
          <span>{selectedPlan.planType}</span>
        </div>

        <div className="order-row">
          <span>Monthly Fee</span>
          <span>₹{selectedPlan.amount}</span>
        </div>

        <div className="order-row">
          <span>Lunch Box Charge</span>
          <span>₹{selectedPlan.lunchBoxCharge}</span>
        </div>

        <hr />

        <div className="order-row total-row">
          <span>Total Amount</span>
          <span>₹{selectedPlan.totalAmount}</span>
        </div>

        <button
          className="payment-btn"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading
            ? "Creating Subscription..."
            : "Continue to Payment"}
        </button>

      </div>
    </div>
  );
}

export default OrderSummary;