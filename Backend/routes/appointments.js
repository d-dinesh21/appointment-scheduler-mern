const express = require("express");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

const router = express.Router();

// All routes below require login
router.use(auth);

// POST /api/appointments  -> create appointment
router.post("/", async (req, res) => {
  try {
    const { date, time, description } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      date,
      time,
      description,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Create appointment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/appointments  -> list + search/filter
router.get("/", async (req, res) => {
  try {
    const { date, status, search } = req.query;

    const filter = { user: req.user.id };

    if (date) filter.date = date;
    if (status) filter.status = status;

    if (search) {
      filter.description = { $regex: search, $options: "i" };
    }

    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/appointments/:id  -> update appointment
router.put("/:id", async (req, res) => {
  try {
    const { date, time, description, status } = req.body;

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (description) appointment.description = description;
    if (status) appointment.status = status;

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error("Update appointment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/appointments/:id  -> delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Delete appointment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
