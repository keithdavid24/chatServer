require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const {PORT, MONGO} =process.env;


mongoose.connect(`${MONGO}/chatServer`);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to: ${MONGO}`))

app.use(express.json());

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

