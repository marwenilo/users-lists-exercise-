const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const {
  userLogin,
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../../controller/users.controller");


//Login User
// access  Public
router.post("/login", userLogin);

// Create a new Customer
// access  Privet
router.post(
  "/add-user",auth,
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
router.get("/users",auth, getUsers);

// Update User By Id
// access  Privet
router.put("/update/:id",auth, updateUser);

//Delete User By Id
// access  Privet
router.delete("/delete/:id",auth, deleteUser);

module.exports = router;
