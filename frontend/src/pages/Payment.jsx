import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../services/paymentService";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
  console.log("Selected Plan in Payment:", selectedPlan);
  const handlePayment = async () => {
    try {
      setLoading(true);

      const transactionId = "TXN" + Date.now();

      const paymentData = {
  userId: user?._id || localStorage.getItem("userId"),
  transactionId,
  amount: selectedPlan.totalAmount,
  paymentMethod,
  planType: selectedPlan.planType,
  paymentStatus: "Success",
};

      const response = await createPayment(paymentData);

      console.log("Payment Response:", response.data);

      const payment = {
        ...response.data.payment,

        transactionId:
          response.data.payment?.transactionId || transactionId,

        planType: selectedPlan.planType,   

        amount: selectedPlan.totalAmount,

        paymentMethod,

        paymentStatus: "Success",

        createdAt: new Date().toISOString(),
      };

      // Save latest payment
      localStorage.setItem("payment", JSON.stringify(payment));

      // Save payment history
      const history =
        JSON.parse(localStorage.getItem("paymentHistory")) || [];

      history.push(payment);

      localStorage.setItem(
        "paymentHistory",
        JSON.stringify(history)
      );

      navigate("/payment-success");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Payment Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>{selectedPlan.planType} Plan</h2>

        <p>
          Amount :
          <strong> ₹{selectedPlan.totalAmount}</strong>
        </p>

        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Card
        </label>

        <label>
          <input
            type="radio"
            value="Net Banking"
            checked={paymentMethod === "Net Banking"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Net Banking
        </label>

        <label>
          <input
            type="radio"
            value="Cash"
            checked={paymentMethod === "Cash"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Cash
        </label>

        <button
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;