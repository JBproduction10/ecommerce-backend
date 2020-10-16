const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require('dotenv').config();
//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const braintreeRoute = require('./routes/braintree');
const orderRoute = require('./routes/order');

//const { config } = require('dotenv/types');

//app
const app = express();

//database
mongoose.connect(process.env.DATABASE,
        {

                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
        }).then(() => console.log("DB Conncted"));
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//using the routes
app.use("/api", authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', braintreeRoute);
app.use('/api', orderRoute);


const port= process.env.PORT || 8000;

app.listen(port, () => {console.log(`Server runing on ${port}`)});