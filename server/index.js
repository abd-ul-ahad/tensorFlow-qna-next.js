import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import express from "express";

// Globals
let model;

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ done: true });
});

app.listen(8080, async () => {
  console.log("model loaded");
});
