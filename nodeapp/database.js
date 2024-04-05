const mongoose = require("mongoose");
require("dotenv").config()
const  MONGOURL  = process.env.MONGOURL

 
mongoose.set('strictQuery', false);
 
const connectDB = async () => {
    try {
        mongoose.connect(MONGOURL, {
            
        }).then(() => {
            console.log('MongoDB Connection successful!');
        }).catch((e) => {
            console.log('Connection failed!');
        })
 
    } catch (error) {
        console.log(error)
 
    }
}
 
module.exports = connectDB