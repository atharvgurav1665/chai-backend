import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const varifyJWT = asyncHandler(async(req,_,next) =>       // _  = res [ useki jagh _ use kiya ] 
{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
 
     if(!token){
         throw new ApiError(401,"Unauthorizedrequest ")
     }
 
     const decodedToken = jwt.varify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-passwowrd -refreshToken")
 
     if(!user){
         // TODO: discuss about frontend 
         throw new ApiError(401,"Invalid AccessToken ")
     }
 
     req.user = user;
     next()
   } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token ")

   }

})

