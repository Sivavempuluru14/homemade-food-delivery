import { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import "../Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { login } = useContext(AuthContext);
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

    setErrors({});

    try {
      const response = await API.post("/api/auth/user/login", data);

     localStorage.setItem("token", response.data.token);
localStorage.setItem("role", response.data.user.role);
localStorage.setItem("user", JSON.stringify(response.data.user));
      login(response.data);

      alert("Login Successful");

    const selectedPlan = localStorage.getItem("selectedPlan");

        if (selectedPlan) {
        navigate("/order-summary");
        } else {
        navigate("/profile");
        }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">Welcome back</span>
          <h2>Login</h2>
          <p className="auth-intro">Access your account and continue enjoying delicious homemade meals.</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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

{errors.password && (
  <p className="error">{errors.password}</p>
)}

          <button type="submit">Login</button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;