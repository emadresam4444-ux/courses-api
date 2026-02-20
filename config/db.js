const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;
const mongooseDB=async ()=>{
    try{
    await mongoose.connect(URL);
        console.log('Database connected successfully');
    }
    catch(err)
    {
        console.error("DB connection error:", err);
        process.exit(1);
    }
};
module.exports=mongooseDB;
