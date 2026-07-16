import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

return (
  <div className="profile-container">
    <div className="profile-card">
      <h2>My Profile</h2>

      <div className="profile-item">
        <strong>Full Name</strong>
        <p>{user.fullName}</p>
      </div>

      <div className="profile-item">
        <strong>Email</strong>
        <p>{user.email}</p>
      </div>

      <div className="profile-item">
        <strong>Mobile</strong>
        <p>{user.mobile}</p>
      </div>

      <div className="profile-item">
        <strong>Location</strong>
        <p>{user.location}</p>
      </div>

     <button className="payment-btn" onClick={() => navigate("/order-summary")}>
    Proceed to Payment
     </button>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
);
}

export default Profile;