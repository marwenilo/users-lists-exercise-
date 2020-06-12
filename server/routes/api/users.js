const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const {
//  userLogin,
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../../controller/users.controller");

/**
 * @api /add-user
 * @method POST
 * @description creates a user
 */
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
)
/**
 * @method GET
 * @api /users
 * @description gets the list of users
 */
.get("/users", getUsers)

/**
 * @method PUT
 * @api /users/:id
 * @description updates a user
 */
.put("/update/:id",auth, updateUser)
/**
 * @method PUT
 * @api /delete/:id
 * @description deletes a user
 */
.delete("/delete/:id",auth, deleteUser);

module.exports = router;
