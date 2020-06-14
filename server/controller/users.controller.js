const db = require("../config/db.config.js");
const User = db.users;
const bcrypt = require("bcryptjs");

const moment = require("moment");

// *************
// create new user controler
//from add new user
//////////////////////***********done */
createUser = async (req, res) => {
  const { name, family_name, password } = req.body;
  try {
    // Check if user exist
    let userExist = await User.findOne({
      where: {
        name,
        family_name,
      },
    });
    if (userExist) {
      return res.status(400).json({
        message: `user is already Exist!`,
       
      })
    }
    // Save to MySQL database
    let user = new User({
      name,
      family_name,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();

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
const formatDate = (date) =>
  date ? moment(date).format("YYYY-MM-DD h:mm a") : "";

getUsers = async (req, res) => {
  try {
    let users = await User.findAll();
    users = users.map(({ dataValues }) => {
      return {
        ...dataValues,
        last_login_date: formatDate(dataValues.last_login_date),
        createdAt: formatDate(dataValues.createdAt),
        updatedAt: formatDate(dataValues.updatedAt),
      };
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ err: err.message });
  }
};

// *************
//Update User By Id
//////////////////////***********done */
updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    let password = req.body.password;
    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(password, salt);

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
