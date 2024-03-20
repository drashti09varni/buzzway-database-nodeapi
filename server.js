require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const bodyParser = require('body-parser');
const cors = require('cors');
const cityRoutes = require('./routes/city.router');
const taxiRoutes = require('./routes/taxi.router');
const carDetailsRoutes = require('./routes/carDetails.routes');
const tourDetailsRoutes  = require('./routes/tour.routes');
const memoriesRoutes = require('./routes/memories.routes');
const  contactRoutes = require('./routes/contactus.routes');
const carcabRoutes = require('./routes/cabColloction.routes');
const BookingRoutes = require('./routes/booking_form.routes');
const UserRoutes = require('./routes/user.routes');
const DropCityRoutes = require('./routes/Local_DropCity.routes');
const DropCityRoutesDetails = require('./routes/Local_DropCityDeatil.routes');
const BlogRoutes = require('./routes/blog.routes');
const CityBookingRoutes = require('./routes/booking_car.routes');
const LoginUserRoutes = require('./routes/Login.routes');






const Database_Url = process.env.Database_Url || 'mongodb+srv://varniinfosoft:ECEVQJpvWQ0IWkDK@cluster0.wdtiomv.mongodb.net/hindustancab';
const PORT = process.env.PORT || 4200;
mongoose.connect(Database_Url, {useNewUrlParser:true,useUnifiedTopology:true,w: 'majority',})
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err.message));

const app = express();


app.use("/public", express.static(__dirname + "/public"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser());
app.use('/api/v1/uploads', express.static('uploads'));
app.use(cors({
  withCredentials: true,
  origin: ['*', 'http://localhost:3000', 'http://localhost:3001', 'http://193.203.162.218:4100','http://193.203.162.218:4400']
}));

app.use('/api/v1', cityRoutes);
app.use('/api/v1', taxiRoutes);
app.use('/api/v1', carDetailsRoutes);
app.use('/api/v1',  tourDetailsRoutes);
app.use('/api/v1',memoriesRoutes);
app.use('/api/v1',contactRoutes);
app.use('/api/v1',carcabRoutes);
app.use('/api/v1',BookingRoutes);
app.use('/api/v1',BookingRoutes);
app.use('/api/v1',UserRoutes);
app.use('/api/v1',DropCityRoutes);
app.use('/api/v1',DropCityRoutesDetails);
app.use('/api/v1',BlogRoutes);
app.use('/api/v1',CityBookingRoutes);
app.use('/api/v1',LoginUserRoutes);



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
  });
  
  
  app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
  });
//
// https://phpstack-921939-3903822.cloudwaysapps.com/nodejsApi/

  // nidhivarniinfoteach 19OZlm2xqsPTZPuP

