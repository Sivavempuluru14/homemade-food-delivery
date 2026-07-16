import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentHistory.css";

function PaymentHistory() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("paymentHistory")) || [];
    setPayments(history);
  }, []);

  return (
    <div className="history-container">
      <h1>Payment History</h1>

      {payments.length === 0 ? (
        <p className="no-data">No payment history available.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Transaction ID</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{payment.transactionId}</td>

                <td>{payment.planName || "-"}</td>

                <td>₹{payment.amount}</td>

                <td>{payment.paymentMethod || "UPI"}</td>

                <td>
                  <span
                    className={
                      payment.paymentStatus === "Success"
                        ? "success"
                        : "failed"
                    }
                  >
                    {payment.paymentStatus}
                  </span>
                </td>

                <td>
                  {payment.createdAt
                    ? new Date(payment.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "-"}
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate("/payment-details", {
                        state: payment,
                      })
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentHistory;