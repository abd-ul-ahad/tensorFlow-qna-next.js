const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  passages: { type: [String] },
  token: String,
});

exports.User = mongoose.model("User", UserSchema);
