const express = require("express");
const db = require("../data/dbConfig.js");

const accountsRouter = require("./accounts-router")

const server = express();
server.use(express.json());
server.use("/", accountsRouter)





module.exports = server;
