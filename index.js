const express = require("express");
require("dotenv").config();
var randomWords = require("random-words");
//connect
const { connection } = require("./config/db");
//model
const { PlayScoreModel } = require("./model/play.model");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.get("/playzone", (req, res) => {
  let word = randomWords();
  res.send(word);
});

app.post("/addscore", async (req, res) => {
  try {
    console.log(req.body);
    const userScore = await PlayScoreModel.create(req.body);
    await userScore.save();
    res.status(200).send(userScore);
  } catch (err) {
    // throw new Error(err);
    console.log(err);
    res.status(404).send({ message: "something went wrong" });
  }
});

app.get("/usedetail", async (req, res) => {
  try {
    let users = await PlayScoreModel.find();
    res.send({ message: "users data", data: users });
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `db is connected successfull7y on the port http://localhost:${port}`
    );
  } catch (err) {
    console.log(err);
  }
});
