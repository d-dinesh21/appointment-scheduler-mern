const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // 👈 add this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());          // 👈 allow frontend (React) to call backend
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointments"));

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});