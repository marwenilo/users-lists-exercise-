const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const {
  userLogin,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../../controller/users.controller");


//Login User
// access  Public
router.post("/login", userLogin);

// Create a new Customer
// access  Public
router.post(
  "/add-user",
  // [
  //   check("name", "Name is required").not().isEmpty(),
  //   check("family_name", "family Name is required").not().isEmpty(),
  //   check(
  //     "password",
  //     "Please enter a password with 6 or more characters"
  //   ).isLength({ min: 6 }),
  // ],
  
     createUser
  
);

// Get all Users
// access  Privet
app.get("/users", auth, getUsers);

// Update User By Id
// access  Privet
app.put("/:id", auth, updateUser);

//Delete User By Id
// access  Privet
app.delete("/:id", auth, deleteUser);

module.exports = router;
