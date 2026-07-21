import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const navigate = useNavigate();

  const payment = JSON.parse(localStorage.getItem("payment"));

  if (!payment) {
    return (
      <div className="success-container">
        <h2>No Payment Found</h2>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>✅ Payment Successful</h1>

        <p>
          <strong>Transaction ID:</strong> {payment.transactionId}
        </p>

        <p>
          <strong>Amount:</strong> ₹{payment.amount}
        </p>

        <p>
          <strong>Payment Method:</strong> {payment.paymentMethod}
        </p>

        <p>
          <strong>Status:</strong> {payment.paymentStatus}
        </p>

        <button onClick={() => navigate("/confirmation")}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;