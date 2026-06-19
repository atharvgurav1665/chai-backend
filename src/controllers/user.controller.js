import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const registerUser = asyncHandler( async (req,res) =>{
    //steps for registation of user --->>>
    //
    //get user details from frontend 
    //validation -- not empty 
    // check if user already exits : by username / email 
    //check for images , check for avatar
    //upload  them to cloudinary , [avatar]
    //create user object -- create entry in DB
    //remove password and refresh tokens field from response 
    // check for user creation 
    //return  response [res]


    const { fullName,username,email,password}=req.body
    // console.log("Email :",email);

    if (
        [fullName,email,username,password].some((field)=> field?.trim() === "")  // if field is empty itwill return true remember
    ) {
        throw new ApiError(400,"All fields are required !")
    }

    const exitedUser= await User.findOne({
        $or : [{ username },{ email }]
    })

    if(exitedUser){
        throw new ApiError(409,"user with username already exits !");
    }
    
    console.log(req.files);

    //const avatarLocalPath = req.files?.avatar[0]?.path;
    
    const avatarLocalPath = req.files?.avatar?.[0]?.path;


    //  let avatarLocalPath;
    //  if(req.files && Array.isArray(req.files.avatar)) {
    //      avatarLocalPath = req.files.avatar[0].path
    //  }

   // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    let coverImageLocalPath ;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    


    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file  is required !")
    }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
   if(!avatar){
    throw new ApiError(400,"Avatar file is required !")
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage :coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase(),
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser) {
    throw new ApiError(500,"Something went wrong while registring a user !")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered SucessFully !")
   )

})

export {registerUser}

