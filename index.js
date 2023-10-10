require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const user = require("./controllers/user.controllers");

const {PORT, MONGO} =process.env;


mongoose.connect(`${MONGO}/chatServer`);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to: ${MONGO}`))

app.use(express.json());

app.use("/user", user);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

