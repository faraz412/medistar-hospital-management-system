
const express = require("express");
const cors = require('cors');
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const { userRouter } = require("./routers/user.router");
const { connection } = require("./config/db");
const { adminAuthRouter } = require("./routers/adminAuth.router");
const { authenticate } = require("./middlewares/authenticator.mw");

// app.use(authenticate)
app.use('/user',userRouter)
app.use('/admin',adminAuthRouter)


app.listen(process.env.port,async()=>{
     try {
        await connection
        console.log('Connected to DB')
        console.log(`Listening at ${process.env.port}`)
     } catch (error) {
        
     }
})
