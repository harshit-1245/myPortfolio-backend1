const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect('mongodb://127.0.0.1:27017/contact',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
    
        });
        console.log(`MongoDB connected ${conn.connection.host}`.green);
    } catch (error) {
        console.log(`Error Message: ${error.message}`)
    }
}

module.exports=connectDB;