require ("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
const mongo_password = process.env.MONGODB_PASSWORD
const mongo_url = process.env.MONGO_URL.replace("<password>", mongo_password);

const connectDB = async()=>{
    mongoose.connect(mongo_url).then(()=>{
        console.log(`Databse connected successfully`);
        
    }).catch((error)=>{
        console.log(`an error occured while connecting to database`, error);
        
    })
};


module.exports = connectDB;