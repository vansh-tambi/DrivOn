const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const connectDB = require("./database/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

dotenv.config();
connectDB();

app.use(cors({
  origin: 'https://drivon.onrender.com',
  credentials: true
}));

  
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
