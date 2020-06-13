const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../../controller/users.controller");

/**
 * @api /add-user
 * @method POST
 * @description creates a user
 */
router
  .post(
    "/add-user",
    auth,

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
  .put("/update/:id", auth, updateUser)
  /**
   * @method PUT
   * @api /delete/:id
   * @description deletes a user
   */
  .delete("/delete/:id", auth, deleteUser);

module.exports = router;
