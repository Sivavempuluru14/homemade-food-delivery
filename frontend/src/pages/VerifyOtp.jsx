import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function VerifyOtp() {
  const navigate = useNavigate();

  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");

  const pendingUser = JSON.parse(
    localStorage.getItem("pendingUser")
  );

  async function verify(e) {
    e.preventDefault();

    if (!pendingUser) {
      alert("Registration details not found.");
      navigate("/register");
      return;
    }

    try {
        console.log({
        email: pendingUser.email,
        mobile: pendingUser.mobile,
        emailOtp,
        whatsappOtp,
});
      // Step 1: Verify OTP
      await API.post("/api/auth/verify-otp", {
        email: pendingUser.email,
        mobile: pendingUser.mobile,
        emailOtp,
        whatsappOtp,
      });

      // Step 2: Register User
      const response = await API.post(
        "/api/auth/register",
        pendingUser
      );

      alert(response.data.message);

      localStorage.removeItem("pendingUser");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        <form onSubmit={verify}>
          <input
            type="text"
            placeholder="Enter Email OTP"
            value={emailOtp}
            onChange={(e) =>
              setEmailOtp(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Enter WhatsApp OTP"
            value={whatsappOtp}
            onChange={(e) =>
              setWhatsappOtp(e.target.value)
            }
            required
          />

          <button type="submit">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;