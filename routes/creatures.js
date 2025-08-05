const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAuth = require("../middleware/Auth");
const {
  getCreatures,
  getCreatureId,
  updateCreature,
  deleteCreature,
  addCreatures,
} = require("../controllers/creaturesController");

router.get("/creatures", getCreatures);

router.get("/creatures/:id", getCreatureId);

router.post("/creature/add", verifyToken, isAuth, addCreatures);

router.put("/creatures/:id", verifyToken, isAuth, updateCreature);

router.delete("/creatures/:id", verifyToken, isAuth, deleteCreature);

module.exports = router;
