const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

//DB Config
const db = require("./config/default").mongoURI;

//Init Middleware
app.use(express.json({ extended: false }));

// Connect to MongoDB

// Use Routes
app.use("/api/users", require("./routes/api/users"));

app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
