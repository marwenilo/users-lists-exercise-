const express = require("express");
const connectDB = require('./config/db.config');
const app = express();


  // connect DB
// force: true will drop the table if it already exists
connectDB.sequelize.sync({force: false}).then(() => {
  console.log('Will not drop and Resync with { force: false }');
});

//Init Middleware
app.use(express.json({ extended: false }));

// Use Routes
app.use("/api/users", require("./routes/api/users"));

// app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
