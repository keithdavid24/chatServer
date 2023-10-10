require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const user = require("./controllers/user.controllers");
const rooms = require("./controllers/room.controller");
const messages = require("./controllers/messages.controller")

const {PORT, MONGO} =process.env;


mongoose.connect(`${MONGO}/chatServer`);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to: ${MONGO}`))

app.use(express.json());

app.use("/user", user);

app.use("/room", rooms);

app.use("/messages", messages);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

