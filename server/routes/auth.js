const express = require("express");
const { User } = require("../model/user.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const router = express.Router();

router
  .post("/register", async (req, res) => {
    try {
      let { name, email, password } = req.body;

      password = await EncPassword(password);

      const instance = new User({
        name,
        email,
        password,
      });
      await instance.save();

      res.json({ done: true, user: instance });
    } catch (error) {
      res.json({ done: false, error: error.message });
    }
  })
  .post("/login", async (req, res) => {
    try {
      let { email, password } = req.body;

      const instance = await User.findOne({ email: email });

      if (bcrypt.compareSync(password, instance.password)) {
        var token = jwt.sign(
          { name: instance.name, email },
          process.env.SECRET
        );

        instance.token = token;
        await instance.save();

        res.json({ done: true, token });
      } else {
        res.json({ done: true, error: "incorrect validations" });
      }
    } catch (error) {
      res.json({ done: false, error: error.message });
    }
  });

const EncPassword = (_password) => {
  return new Promise((resolve, reject) => {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(_password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};

exports.router = router;
