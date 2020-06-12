const express = require("express");
const connectDB = require('./config/db.config');
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const app = express();

// connect DB
// force: true will drop the table if it already exists
connectDB.sequelize.sync({force: false}).then(() => {
  console.log('Will not drop and Resync with { force: false }');
});

//Init Middleware
app.use(express.json({ extended: false }));

// Use Routes
app.use("/api/users", usersRoute);

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
