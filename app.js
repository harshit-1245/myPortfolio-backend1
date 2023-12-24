const express=require('express');

const colors=require('colors');
const cors=require('cors')
const connectDB = require( './config/db' );
const userRouter=require('./routes/userRoutes')
require('dotenv').config();
const path=require('path')

const app=express();

connectDB();

app.use(express.json())
app.use(cors());
const port=process.env.PORT;


app.use('/contact',userRouter);




app.listen(port,()=>{
    console.log(`Server live at ${port}`.yellow);
});

