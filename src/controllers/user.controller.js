import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req,res) =>{
    //steps for registation of user --->>>
    //get user details from frontend 
    //validation -- not empty 
    // check if user already exits : by username / email 
    //check for images , check for avatar
    //upload  them to cloudinary , [avatar]
    //create user object -- create entry in DB
    //remove password and refresh tokens field from response 
    // check for user creation 
    //return  response [res]


    const {fullName,username,email,password}=req.body
    console.log("Email :",email);
})

export {registerUser}

