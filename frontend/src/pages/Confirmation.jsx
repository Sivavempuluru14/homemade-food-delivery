import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const payment = JSON.parse(localStorage.getItem("payment"));
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  console.log("Selected Plan in Confirmation:", plan);
  useEffect(() => {
  localStorage.removeItem("selectedPlan");
}, []);
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">

        <h1>🎉 Subscription Confirmed</h1>

        <h3>Customer Details</h3>

        <p><strong>Name:</strong> {user?.fullName}</p>

        <p><strong>Email:</strong> {user?.email}</p>

        <p><strong>Plan:</strong> {plan?.planType}</p>

        <p><strong>Total Paid:</strong> ₹{payment?.amount}</p>

        <p><strong>Transaction ID:</strong> {payment?.transactionId}</p>

        <p><strong>Status:</strong> {payment?.paymentStatus}</p>

       <button
  onClick={() => {
    console.log("Before:", localStorage.getItem("selectedPlan"));

    localStorage.removeItem("selectedPlan");

    console.log("After:", localStorage.getItem("selectedPlan"));

    navigate("/payment-history");
  }}
>
  View Payment History
</button>

      </div>
    </div>
  );
}

export default Confirmation;