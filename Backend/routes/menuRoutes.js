const express = require("express");
const router = express.Router();

const {
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const {
  protect,
} = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

// Public Route
router.get("/", getMenu);

// Admin Only Routes
router.post("/", protect, admin, addMenu);
router.put("/:id", protect, admin, updateMenu);
router.delete("/:id", protect, admin, deleteMenu);

module.exports = router;