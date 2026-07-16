import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import MenuDisplay from "./components/MenuDisplay";
import SubscriptionPlans from "./components/SubscriptionPlans";
import DeliveryOptions from "./components/DeliveryOptions";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import OrderSummary from "./pages/OrderSummary";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Confirmation from "./pages/Confirmation";
import PaymentHistory from "./pages/PaymentHistory";
import PaymentDetails from "./pages/PaymentDetails";

function MainLayout() {
  const [page, setPage] = useState("home");
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="main-nav">
        <button
          className="nav-btn btn-home"
          onClick={() => {
            navigate("/");
            setPage("home");
          }}
        >
          Home
        </button>

        <button
          className="nav-btn btn-menu"
          onClick={() => {
            navigate("/");
            setPage("menu");
          }}
        >
          Explore Menu
        </button>

        <button
          className="nav-btn btn-plan"
          onClick={() => {
            navigate("/");
            setPage("plans");
          }}
        >
          View Plans
        </button>

        <button
          className="nav-btn btn-delivery"
          onClick={() => {
            navigate("/");
            setPage("delivery");
          }}
        >
          Delivery Options
        </button>

        <button
          className="nav-btn btn-register"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

        <button
          className="nav-btn btn-login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="nav-btn btn-profile"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </header>

      <main className="page-body">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                {page === "home" && (
                  <HomePage
                    onViewPlans={() => setPage("plans")}
                    onExploreMenu={() => setPage("menu")}
                  />
                )}

                {page === "menu" && (
                  <MenuDisplay
                    onViewPlans={() => setPage("plans")}
                  />
                )}

                {page === "plans" && <SubscriptionPlans />}

                {page === "delivery" && <DeliveryOptions />}
              </>
            }
          />

          {/* Authentication */}
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />

          {/* Member 4 Pages */}
          <Route path="/order-summary" element={<OrderSummary />} />

          <Route path="/payment" element={<Payment />} />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/confirmation"
            element={<Confirmation />}
          />

          <Route
            path="/payment-history"
            element={<PaymentHistory />}
          />

         <Route path="/payment-details" element={<PaymentDetails />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>Saffron Courtyard — Homemade food with hotel-style care.</p>

        <p>
          Contact us for warm, daily-prepared meals and simple
          subscription plans.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;