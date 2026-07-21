import { useNavigate } from "react-router-dom";
import "../Auth.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">Welcome Back</span>
          <h2>Login</h2>
          <p className="auth-intro">
            Choose how you want to login to continue.
          </p>
        </div>

        <button
          className="login-option-btn"
          onClick={() => navigate("/login/user")}
        >
          👤 User Login
        </button>

        <button
          className="login-option-btn admin"
          onClick={() => navigate("/login/admin")}
        >
          🔐 Admin Login
        </button>
      </div>
    </div>
  );
}

export default Login;