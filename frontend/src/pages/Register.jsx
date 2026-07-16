import { useState,useEffect } from "react";
import API from "../services/api";
import "./Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateRegister } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  location: "",
  plan: "",
});

useEffect(() => {
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

  if (selectedPlan) {
    setForm((prev) => ({
      ...prev,
      plan: selectedPlan.planType,
    }));
  }
}, []);
  
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  }

 async function register(e) {
  e.preventDefault();

  const validationErrors = validateRegister({
    ...form,
    confirmPassword,
  });

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  try {
    const response = await API.post("/api/auth/send-otp", {
      email: form.email,
      mobile: form.mobile,
    });

    console.log(response.data);

    alert("OTP has been sent to your Email and WhatsApp.");

    localStorage.setItem(
      "pendingUser",
      JSON.stringify(form)
    );

    navigate("/verify-otp");

  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to send OTP"
    );
  }
}
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={register}>
          {/* Full Name */}
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error-input" : ""}
          />
          {errors.fullName && (
            <p className="error">{errors.fullName}</p>
          )}

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

          {/* Mobile */}
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className={errors.mobile ? "error-input" : ""}
          />
          {errors.mobile && (
            <p className="error">{errors.mobile}</p>
          )}

          {/* Password */}
          <div className="input-group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="error">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({
                  ...errors,
                  confirmPassword: "",
                });
              }}
              className={errors.confirmPassword ? "error-input" : ""}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

            <input
              type="text"
              name="plan"
              value={form.plan}
              readOnly
            />
            {errors.plan && (
            <p className="error">{errors.plan}</p>
            )}

            <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className={errors.location ? "error-input" : ""}
            >
            <option value="">Select Your Location</option>
            <option value="Guindy Railway Station">
                Guindy Railway Station
            </option>
            <option value="IIT Madras">
                IIT Madras
            </option>
            <option value="Anna University">
                Anna University
            </option>
            <option value="SIDCO Industrial Estate">
                SIDCO Industrial Estate
            </option>
            <option value="CIT Nagar">
                CIT Nagar
            </option>
            </select>

            {errors.location && (
            <p className="error">{errors.location}</p>
            )}
          
          <button type="submit">Register</button>

            <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
                Login
            </Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Register;