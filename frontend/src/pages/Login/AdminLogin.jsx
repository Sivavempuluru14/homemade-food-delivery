import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import "../Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const validationErrors = validateLogin(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await API.post("/api/auth/admin/login", data);

     localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Admin Login Successful");

      navigate("/profile");
    } catch (error) {
      alert("Invalid Admin Credentials");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">Admin Portal</span>
          <h2>Admin Login</h2>
          <p className="auth-intro">
            Login to manage users and orders.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={data.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />

          {errors.email && <p className="error">{errors.email}</p>}

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
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

          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Admin Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;