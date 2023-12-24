const asyncHandler = require('express-async-handler');
const nodemailer=require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();

const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
      user:process.env.SMTP_MAIL,
      pass:process.env.SMTP_PASSWORD,
    },
     })

const getUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

const sendInfo = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Please fill in the name and email section" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            name,
            email,
            message,
        });

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

const sendEmail = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
   //nodemailer
  const mailOptions={
    from:process.env.SMTP_HOST,
    to:email,
    name:name,
    message:message,
  }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.error(error)
        }else{
            console.log("Email sent successfully")
        }
    })    
});



module.exports = { getUser, sendInfo,sendEmail};
