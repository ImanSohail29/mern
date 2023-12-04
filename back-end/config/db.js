//to read environmental variables(to read connection string)
const mongoose = require("mongoose");
const connectDB = async () => {
    try { //await is used to make the line synchronous(it does not move to next line until the operation is completed)
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true,
        }) //First argument is connection string and other arguments are not necessary they are only used to avoid deprecated messages sent by mongoDB in console
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1); // Good practice is to close the program 0 means success, 1 means fail
    }
}
module.exports=connectDB;