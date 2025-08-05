const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  updateProfile,
  getProfileData,
  getFavCreature,
  addFavCreature,
  deleteFavCreature,
} = require("../controllers/userController");

router.get("/user/profile", verifyToken, getProfileData);

router.put("/user/profile", verifyToken, updateProfile);

router.get("/user/favorite", verifyToken, getFavCreature);

router.put("/user/favorite/:id", verifyToken, addFavCreature);

router.delete("/user/favorite/:id", verifyToken, deleteFavCreature);

module.exports = router;
