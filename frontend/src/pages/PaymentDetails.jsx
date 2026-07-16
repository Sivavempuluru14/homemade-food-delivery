import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentDetails.css";

function PaymentDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="details-container">
        <h2>No Payment Details Found</h2>

        <button onClick={() => navigate("/payment-history")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">

        <h2>Payment Details</h2>

        <p><strong>Transaction ID:</strong> {state.transactionId}</p>

        <p><strong>User ID:</strong> {state.userId}</p>

        <p><strong>Amount:</strong> ₹{state.amount}</p>

        <p><strong>Payment Method:</strong> {state.paymentMethod}</p>

        <p><strong>Status:</strong> {state.paymentStatus}</p>

       <p>
  <strong>Payment Date:</strong>{" "}
  {state.createdAt
    ? new Date(state.createdAt).toLocaleString()
    : "Not Available"}
   </p>

       <div className="details-buttons">
  <button
    className="back-btn"
    onClick={() => navigate("/payment-history")}
  >
    Back to History
  </button>

  <button
    className="home-btn"
    onClick={() => navigate("/")}
  >
    Back to Home
  </button>
</div>

      </div>
    </div>
  );
}

export default PaymentDetails;