import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      <table>

        <thead>

          <tr>

            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment, index) => (

            <tr key={index}>

              <td>{payment.transactionId}</td>

              <td>₹{payment.amount}</td>

              <td>{payment.paymentStatus}</td>

              <td>

             <button
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

    </div>
  );
}

export default PaymentHistory;