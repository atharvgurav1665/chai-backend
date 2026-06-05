// require('dotenv').config({path :'./env'})  old method 
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
    path :'./env'
})

connectDB();






















/*  # 1st approch for creating & connecting  database code simple but complex

import express from "express";
const app= express()

( async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  
       app.on("error",(error) => { console.log("Error : ",error); 
        throw error
       })
       
       app.listen(process.env.PORT,() =>{
        console.log(`app is listening on port ${process.env.PORT}`);
       })
    } catch(error){
        console.error("ERROR : ",error)
        throw err
    }
})()
*/
