const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware= require('./Middlewares/errors')

const dotenv=require('dotenv');

//setting up config file
dotenv.config({path:'config/config.env'})




app.use(express.json({limit: '50mb'}));
// app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(fileUpload());
app.use(cors())

// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// //import all routes

const category = require('./Routes/Categegory');

/////////////User////////////////////
app.use('/api/v1', category)



////////////////////////////////////


//Middleware to handle errors
app.use(errorMiddleware);

module.exports=app
