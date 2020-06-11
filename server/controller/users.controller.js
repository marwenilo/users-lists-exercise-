const db = require("../config/db.config.js");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// *************
// create new user controler
//from add new user
createUser = async (req, res) => {
  console.log(req.body, "backend usercreate");
  const { name, family_name, password, created_at } = req.body;
  try {
    // Save to MySQL database
    user = new User({
      name,
      family_name,
      password,
      created_at,
    });
    //Crypt password
    const salt = await bcrypt.genSalt(10);
    // remember to check the kind of the id after the salt so i can user the right type between the front and the db
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //Create Token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000000000000 },
      (err, token) => {
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// *************
//Get All Users
//after login
getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// *************
//Update User By Id
updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const filter = { id };
    const update = req.body;

    //Update
    const user = await Merch.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// *************
//Delete User By Id
deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();

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

module.exports = controller;
