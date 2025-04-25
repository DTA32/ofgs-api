require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const gameRoutes = require("./routes/gameRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const apiPrefix = process.env.API_PREFIX;
const defaultRouter = express.Router();

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});
db.once("connected", () => {
    console.log("Database connected!");
});

defaultRouter.get("", (req, res) => {
    res.status(200).send("Hello from API! Please specify endpoint");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(apiPrefix, defaultRouter);
app.use(apiPrefix + "/games", gameRoutes);
// app.use(apiPrefix + "/admin", adminRoutes);
// app.use(apiPrefix + "/games/get", express.static(__dirname + "/public/games"));

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running on port " + process.env.SERVER_PORT);
});
