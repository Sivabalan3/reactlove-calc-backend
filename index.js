const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const connection = mongoose.connection;

const url = process.env.ATLAS_URL;

const nameSchema = new mongoose.Schema({
  name1: String,
  name2: String,
});

const Name = mongoose.model("lovecalc", nameSchema);

app.post("/names", async (req, res) => {
  const { name1, name2 } = req.body;
  const name = new Name({ name1, name2 });
    await name.save();
  res.send("Names saved successfully");
});

app.listen(5000, () => console.log("Server started on port 5000"));

mongoose.connect(url);
connection.once("open", () => {
  console.log("mongoose db connected sucessfully");
});
