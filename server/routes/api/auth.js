const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const db = require("../../config/db.config.js");
const User = db.users;

// *************
//Get user info
//////////////////////***********done */

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user,"user login back")
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// *************
//Login User
//////////////////////***********done */
router.post("/", async (req, res) => {
  const { name, family_name, password,loginTime } = req.body;
  const last_login_date=loginTime
  try {
    // if the user exists****

    let user = await User.findOne({
      where: {
        name,
        family_name,
      },
    });
    console.log(user,"user login back2")
    // console.log(last_login_date,"login time")
    await user.update({last_login_date:loginTime});
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    //return jsonweb token to login rightaway after they reg to the site****

    const isMatch = await bcrypt.compare(password, user.password);
console.log(user.password,"user password back")
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
