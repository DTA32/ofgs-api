require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const adminAPI =
  process.env.NODE_ENV === "prod" ? process.env.ADMIN_API : "/admin";
const adminRoutes = require("./routes/adminRoutes");

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database connected!");
});

const app = express();
app.use("/api", routes);
app.use("/api" + adminAPI, adminRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
