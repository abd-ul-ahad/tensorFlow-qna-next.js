const express = require("express");
const { User } = require("../model/user.js");

const router = express.Router();

router
  .post("/passages", async (req, res) => {
    try {
      const { token } = req.body;
      const instance = await User.findOne({ token });

      res.json({ done: true, name: instance.name, passages: instance.passages });
    } catch (e) {
      res.json({ done: false, e });
    }
  })
  .put("/passages", async (req, res) => {
    try {
      const { token, passage } = req.body;

      const instance = await User.findOne({ token });
      instance.passages.push(passage);

      await instance.save();

      res.json({ done: true, passages: instance.passages });
    } catch (e) {
      res.json({ done: false, e });
    }
  });

exports.router = router;
