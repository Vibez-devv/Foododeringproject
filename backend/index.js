const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();


const cors = require("cors");

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");

const port = process.env.PORT || 8100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

const startServer = async ()=>{
    try {
        await connectDB()
        app.listen(port, ()=>{
            console.log(`🚀 App is listening on port ${port}`);


        })
    } catch (error) {
        console.log("unable to start server");
        
    }
}

startServer()