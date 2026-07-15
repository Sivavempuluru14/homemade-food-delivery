const Menu = require("../models/Menu");

// Add Food Item
const addMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({
      message: "Food Item Added Successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Food Items
const getMenu = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMenu,
  getMenu,
};
// Update Food Item
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        message: "Food Item Not Found"
      });
    }

    res.status(200).json({
      message: "Food Item Updated Successfully",
      menu: updatedMenu
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addMenu,
  getMenu,
  updateMenu
};
// Delete Food Item
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({
        message: "Food Item Not Found"
      });
    }

    res.status(200).json({
      message: "Food Item Deleted Successfully",
      menu: deletedMenu
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu
};