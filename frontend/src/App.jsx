import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FaBars, FaHotel, FaTimes } from "react-icons/fa";

import HomePage from "./components/HomePage";
import MenuDisplay from "./components/MenuDisplay";
import SubscriptionPlans from "./components/SubscriptionPlans";
import DeliveryOptions from "./components/DeliveryOptions";

import Register from "./pages/Register";
import Login from "./pages/Login/Login";
import UserLogin from "./pages/Login/UserLogin";
import AdminLogin from "./pages/Login/AdminLogin";
import Profile from "./pages/Profile";

import OrderSummary from "./pages/OrderSummary";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Confirmation from "./pages/Confirmation";
import PaymentHistory from "./pages/PaymentHistory";
import PaymentDetails from "./pages/PaymentDetails";
import VerifyOtp from "./pages/VerifyOtp";

const initialFormState = {
  foodName: "",
  category: "",
  price: "",
  description: "",
  image: "",
};

function MainLayout() {
  const [page, setPage] = useState("home");
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [menuAction, setMenuAction] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
    // ADD THESE 3 LINES
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;
  const navigate = useNavigate();


  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedItemId("");
  };

  const fetchMenuItems = async () => {
    try {
      setMenuLoading(true);
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
      setMenuError("");
    } catch (error) {
      console.error(error);
      setMenuError("Menu could not be loaded. Please confirm the backend is running.");
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const closeMenus = () => {
    setShowMenuDropdown(false);
    setShowSettingsMenu(false);
  };

  const navigateToPage = (nextPage, path = "/") => {
    navigate(path);
    setPage(nextPage);
    closeMenus();
  };

  const goHome = () => {
    setPage("home");
    navigate("/");
    closeMenus();
  };

  const openMenuAction = (action) => {
    setMenuAction(action);
    closeMenus();
    setFeedbackMessage("");
    resetForm();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleAddItem = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const response = await axios.post("http://localhost:5000/api/menu", payload);
      setMenuItems((previous) => [response.data.menu, ...previous]);
      setFeedbackMessage("Item added successfully.");
      setMenuAction(null);
      setPage("menu");
      resetForm();
    } catch (error) {
      console.error(error);
      setFeedbackMessage("Unable to add the item right now.");
    }
  };

  const handleSelectItemForEdit = (event) => {
    const itemId = event.target.value;
    setSelectedItemId(itemId);

    const selectedItem = menuItems.find((item) => item._id === itemId);
    if (selectedItem) {
      setFormData({
        foodName: selectedItem.foodName || "",
        category: selectedItem.category || "",
        price: selectedItem.price || "",
        description: selectedItem.description || "",
        image: selectedItem.image || "",
      });
    }
  };

  const handleEditItem = async (event) => {
    event.preventDefault();

    if (!selectedItemId) {
      setFeedbackMessage("Choose an item before saving changes.");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const response = await axios.put(
        `http://localhost:5000/api/menu/${selectedItemId}`,
        payload
      );

      setMenuItems((previous) =>
        previous.map((item) => (item._id === selectedItemId ? response.data.menu : item))
      );
      setFeedbackMessage("Item updated successfully.");
      setMenuAction(null);
      setPage("menu");
      resetForm();
    } catch (error) {
      console.error(error);
      setFeedbackMessage("Unable to update the selected item.");
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItemId) {
      setFeedbackMessage("Choose an item before deleting it.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/menu/${selectedItemId}`);
      setMenuItems((previous) => previous.filter((item) => item._id !== selectedItemId));
      setFeedbackMessage("Item deleted successfully.");
      setMenuAction(null);
      setPage("menu");
      resetForm();
    } catch (error) {
      console.error(error);
      setFeedbackMessage("Unable to delete the selected item.");
    }
  };

  return (
    <div className="app-shell">
      <header className="main-nav">
        <div className="brand-block">
          <span className="brand-icon" aria-hidden="true">
            <FaHotel />
          </span>
          <span className="brand-name">Saffron Courtyard</span>
        </div>

        <div className="nav-buttons-row">
          <Link className="top-nav-link btn-home" to="/" onClick={() => navigateToPage("home", "/")}>
            Home
          </Link>

          <Link className="top-nav-link btn-menu" to="/" onClick={() => navigateToPage("menu", "/")}>
            Menu
          </Link>

          <Link className="top-nav-link btn-plan" to="/" onClick={() => navigateToPage("plans", "/")}>
            Plans
          </Link>

          <Link className="top-nav-link btn-register" to="/register" onClick={() => navigateToPage("register", "/register")}>
            Register
          </Link>

         <Link to="/login" className="top-nav-link btn-login">
          Login
        </Link>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setShowMenuDropdown((previous) => !previous)}
            aria-label="Open navigation menu"
          >
            {showMenuDropdown ? <FaTimes /> : <FaBars />}
          </button>

          {showMenuDropdown && (
            <div className="dropdown-menu">
              <Link className="dropdown-link" to="/" onClick={() => navigateToPage("home", "/")}>
                Home
              </Link>
              <Link className="dropdown-link" to="/" onClick={() => navigateToPage("menu", "/")}>
                Menu
              </Link>
              <Link className="dropdown-link" to="/" onClick={() => navigateToPage("plans", "/")}>
                Plans
              </Link>
              <Link className="dropdown-link" to="/" onClick={() => navigateToPage("delivery", "/")}>
                Delivery Options
              </Link>
              <Link
                  className="dropdown-link"
                  to="/register"
                  onClick={() => navigateToPage("register", "/register")}
                >
                  Register
                </Link>

                <Link
                  className="dropdown-link"
                  to="/login"
                  onClick={() => navigateToPage("login", "/login")}
                >
                  Login
                </Link>

                {isLoggedIn && (
                <>
                  <Link
                    className="dropdown-link"
                    to="/profile"
                    onClick={() => navigateToPage("profile", "/profile")}
                  >
                    Profile
                  </Link>

                  <Link
                      className="dropdown-link dropdown-link-payment"
                      to="/payment-history"
                      onClick={() =>
                        navigateToPage("payment-history", "/payment-history")
                      }
                    >
                      Payment History
                    </Link>
                  </>
                )}
                {isLoggedIn && role === "admin" && (
                <a
                  className="dropdown-link"
                  href="#edit-menu"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSettingsMenu((prev) => !prev);
                  }}
                >
                  Edit Menu
                </a>
              )}

              {role === "admin" && showSettingsMenu && (
                <div className="submenu">
                  <a
                    className="dropdown-link dropdown-link-sub"
                    href="#add-menu"
                    onClick={(event) => {
                      event.preventDefault();
                      openMenuAction("add");
                    }}
                  >
                    Add Menu
                  </a>
                  <a
                    className="dropdown-link dropdown-link-sub"
                    href="#edit-items"
                    onClick={(event) => {
                      event.preventDefault();
                      openMenuAction("edit");
                    }}
                  >
                    Edit Menu
                  </a>
                  <a
                    className="dropdown-link dropdown-link-sub"
                    href="#delete-menu"
                    onClick={(event) => {
                      event.preventDefault();
                      openMenuAction("delete");
                    }}
                  >
                    Delete Menu
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="page-body">
        {role === "admin" && menuAction && (
          <section className="menu-admin-panel">
            <div className="menu-admin-card">
              <div className="menu-admin-header">
                <h3>
                  {menuAction === "add"
                    ? "Add Menu Item"
                    : menuAction === "edit"
                      ? "Edit Menu Item"
                      : "Delete Menu Item"}
                </h3>
                <button
                  type="button"
                  className="close-panel-btn"
                  onClick={() => {
                    setMenuAction(null);
                    resetForm();
                    setFeedbackMessage("");
                  }}
                >
                  Close
                </button>
              </div>

              {feedbackMessage && <p className="admin-feedback">{feedbackMessage}</p>}

              {menuAction === "add" && (
                <form className="menu-form" onSubmit={handleAddItem}>
                  <label>
                    Food Name
                    <input name="foodName" value={formData.foodName} onChange={handleFormChange} required />
                  </label>
                  <label>
                      Category
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                      </select>
                    </label>
                  <label>
                    Price
                    <input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleFormChange} required />
                  </label>
                  <label>
                    Description
                    <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" />
                  </label>
                  <label>
                    Image URL
                    <input name="image" value={formData.image} onChange={handleFormChange} />
                  </label>
                  <button type="submit" className="submit-btn">Add</button>
                </form>
              )}

              {menuAction === "edit" && (
                <form className="menu-form" onSubmit={handleEditItem}>
                  <label>
                    Choose Item
                    <select value={selectedItemId} onChange={handleSelectItemForEdit} required>
                      <option value="">Select an item</option>
                      {menuItems.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.foodName}
                        </option>
                      ))}
                    </select>
                  </label>

                  {selectedItemId && (
                    <>
                      <label>
                        Food Name
                        <input name="foodName" value={formData.foodName} onChange={handleFormChange} required />
                      </label>
                      <label>
                        Category
                        <input
                          name="category"
                          value={formData.category}
                          onChange={handleFormChange}
                          required
                        />
                      </label>
                      <label>
                        Price
                        <input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleFormChange} required />
                      </label>
                      <label>
                        Description
                        <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" />
                      </label>
                      <label>
                        Image URL
                        <input name="image" value={formData.image} onChange={handleFormChange} />
                      </label>
                      <button type="submit" className="submit-btn">Save Changes</button>
                    </>
                  )}
                </form>
              )}

              {menuAction === "delete" && (
                <div className="menu-form delete-form">
                  <label>
                    Choose Item for Deletion
                    <select value={selectedItemId} onChange={handleSelectItemForEdit}>
                      <option value="">Select an item</option>
                      {menuItems.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.foodName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" className="submit-btn danger-btn" onClick={handleDeleteItem}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        <Routes>
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
                    menuItems={menuItems}
                    loading={menuLoading}
                    error={menuError}
                    onViewPlans={() => setPage("plans")}
                  />
                )}

                {page === "plans" && <SubscriptionPlans />}
                {page === "delivery" && <DeliveryOptions />}
              </>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/payment-details" element={<PaymentDetails onGoHome={goHome} />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>Saffron Courtyard — Homemade food with hotel-style care.</p>
        <p>Contact us for warm, daily-prepared meals and simple subscription plans.</p>
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