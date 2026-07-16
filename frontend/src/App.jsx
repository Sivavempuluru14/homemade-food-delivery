import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { FaBars, FaHotel, FaTimes } from "react-icons/fa";

import HomePage from "./components/HomePage";
import MenuDisplay from "./components/MenuDisplay";
import SubscriptionPlans from "./components/SubscriptionPlans";
import DeliveryOptions from "./components/DeliveryOptions";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


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

  const navigateToPage = (nextPage, path = "/") => {
    navigate(path);
    setPage(nextPage);
    setShowMenuDropdown(false);
    setShowSettingsMenu(false);
  };

  const openMenuAction = (action) => {
    setMenuAction(action);
    setShowMenuDropdown(false);
    setShowSettingsMenu(false);
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

          <button className="nav-btn btn-register" onClick={() => navigate("/register")}>
            Register
          </button>

          <button className="nav-btn btn-login" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="nav-btn btn-profile" onClick={() => navigate("/profile")}>
            Profile
          </button>
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
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setShowSettingsMenu((previous) => !previous)}
              >
                Edit Menu
              </button>

              {showSettingsMenu && (
                <div className="submenu">
                  <button type="button" className="dropdown-item" onClick={() => openMenuAction("add")}>
                    Add Items
                  </button>
                  <button type="button" className="dropdown-item" onClick={() => openMenuAction("edit")}>
                    Edit Items
                  </button>
                  <button type="button" className="dropdown-item" onClick={() => openMenuAction("delete")}>
                    Delete Items
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="page-body">
        {menuAction && (
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
          <Route path="/profile" element={<Profile />} />     
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