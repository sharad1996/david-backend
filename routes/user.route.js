const express = require("express");
const {
  getUser,
  createUser,
  getUserById,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/create", createUser);

module.exports = router;
