const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routes/user.js");
const AuthRouter = require("./routes/auth.js");
const { config } = require("dotenv");
config();

const app = express();

app.use(express.json());
app.use("/api/user/", UserRouter.router);
app.use("/api/auth/", AuthRouter.router);

app.get("/", async (req, res) => {
  res.json({ done: true });
});

// MONGOOSE SETUP
const PORT = process.env.PORT | 8080;

// Connecting MONGOOSE
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server is started ${PORT}`));
  })
  .catch((e) => console.log(e));
