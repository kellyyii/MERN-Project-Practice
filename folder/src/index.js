const express = require("express");
const authRoutes = require("./routes/auth.route.js");
const dotenv = require("dotenv").config();
connectDB = require("./lib/db.js")

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});