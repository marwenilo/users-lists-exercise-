const db = require("../config/db.config.js");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const moment = require('moment')

// *************
// create new user controler
//from add new user
//////////////////////***********done */
createUser = async (req, res) => {
  // const user = await User.findOne({ family_name });
  // console.log(user.dataValues.password,"login user")
  // if (!user.dataValues) {
  //   return res.status(404).json({
  //     msg: `User is not found `,
  //   });
  // }
  const { name, family_name, password } = req.body;
  try {
    // Save to MySQL database
    user = new User({
      name,
      family_name,
      password,
    });
    //Crypt password
    const salt = await bcrypt.genSalt(10);
    // remember to check the kind of the id after the salt so i can user the right type between the front and the db
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log(user, "create user");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// *************
//Get All Users
//after login
//////////////////////***********done */
const formatDate = (date) => date ? moment(date).format('YYYY-MM-DD h:mm a') : ''

getUsers = async (req, res) => {
  try {
    let users = await User.findAll();
    users = users.map(({dataValues}) => {
      return {
        ...dataValues,
        last_login_date: formatDate(dataValues.last_login_date),
        createdAt: formatDate(dataValues.createdAt),
        updatedAt: formatDate(dataValues.updatedAt)
      };
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({err: err.message});
  }
};

// *************
//Update User By Id
//////////////////////***********done */
updateUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByPk(req.params.id);
console.log(user,"user update by id")


    //Update
    await user.update(req.body);

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// *************
//Delete User By Id
//////////////////////***********done */
deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    await user.destroy();

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);

    //CHECK FOR THE TYPE OF THE PASSWORD CHECK THE SALT OF THE PASSWORD AND THE DB TYPE "INT"
    if (err.kind === "NUMBER") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
