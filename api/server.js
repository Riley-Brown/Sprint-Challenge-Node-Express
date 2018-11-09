/* ======= IMPORTS ====== */
const express = require("express");
const action = require("./action.js");
const project = require("./project.js");

/* ======= SERVER CONFIG ====== */
const server = express();

/* ======= MIDDLEWARE ====== */
server.use(express.json());

/* ======= ROOT ====== */
server.get("/", (req, res) => {
  res.json({ Hello: "testing" });
});

/* ======= ACTION ROUTE ====== */
server.use("/api/actions/", action);

/* ======= PROJECT ROUTE ====== */
server.use("/api/projects/", project);

module.exports = server;
