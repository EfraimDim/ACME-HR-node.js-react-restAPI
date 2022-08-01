const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/userRoute");
const managersRoute = require("./routes/managerRoute");
const hrManagersRoute = require("./routes/hrManagerRoute");

app.use("/users", usersRoute);
app.use("/managers", managersRoute);
app.use("/hrManagers", hrManagersRoute);

module.exports = app;
