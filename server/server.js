const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));
app.use("/api/search", require("./routes/search"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/stories", require("./routes/stories"));
app.use("/api/messages", require("./routes/messages")); // ✅ NEW
app.use("/api/notifications", require("./routes/notifications")); // ✅ NEWs

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "🚀 Socially API is running!" });
});

// Socket.io initialization
const { initializeSocket } = require("./socket");
initializeSocket(io);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📁 Database:", mongoose.connection.name);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔌 Socket.io running on ws://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });
