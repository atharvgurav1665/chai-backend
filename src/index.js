// require('dotenv').config({path :'./env'})  old method 
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import {app} from './app.js'

dotenv.config({
    path :'./.env'
})
console.log("MONGODB_URI =", process.env.MONGODB_URI);
console.log("PORT =", process.env.PORT);

connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000 , ()=> {
        console.log(`Server is running at port : ${ process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!",err);
})





















/* 1st approch for creating & connecting  database code simple but complex

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
