import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentHistory.css";

function PaymentHistory() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/payment/history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch payment history"
          );
        }

        setPayments(data.payments || []);
      } catch (error) {
        console.error(
          "Payment History Error:",
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [navigate]);

  if (loading) {
    return (
      <div className="history-container">
        <h1>Payment History</h1>
        <p>Loading payment history...</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1>Payment History</h1>

      {payments.length === 0 ? (
        <p className="no-data">
          No payment history available.
        </p>
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
              <tr
                key={
                  payment._id ||
                  payment.transactionId ||
                  index
                }
              >
                <td>{index + 1}</td>

                <td>
                  {payment.transactionId || "-"}
                </td>

                <td>
                  {payment.planType || "-"}
                </td>

                <td>
                  ₹{payment.amount || 0}
                </td>

                <td>
                  {payment.paymentMethod || "UPI"}
                </td>

                <td>
                  <span
                    className={
                      payment.paymentStatus === "Success"
                        ? "success"
                        : "failed"
                    }
                  >
                    {payment.paymentStatus || "-"}
                  </span>
                </td>

                <td>
                  {payment.createdAt
                    ? new Date(
                        payment.createdAt
                      ).toLocaleString("en-IN", {
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
                      navigate(
                        "/payment-details",
                        {
                          state: payment,
                        }
                      )
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