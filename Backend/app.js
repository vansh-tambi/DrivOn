const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const connectDB = require("./database/db");
dotenv.config();
connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;