require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const adminAPI =
  process.env.NODE_ENV === "prod" ? process.env.ADMIN_API : "/admin";
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database connected!");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);
app.use("/api" + adminAPI, adminRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running on port " + process.env.SERVER_PORT);
});
