const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Habit = require("./models/habit");

mongoose
  .connect(
    `mongodb+srv://pratyush:${process.env.PASSWORD}@cluster0.pqk8mrb.mongodb.net/`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error Connecting to MongoDb", error);
  });

app.listen(port, () => {
  console.log("Server running on port 3000");
});

//endpoints

app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
});

app.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/habits/:habitId", async (req, res) => {
  const { habitId } = req.params;
  const updateOnCompletion = req.body.completed;
  try {
    const habitToBeUpdated = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updateOnCompletion },
      { new: true }
    );
    if (!habitToBeUpdated) {
      res.status(404).json({ error: "Habit not found" });
    }
    res.status(200).json(habitToBeUpdated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
