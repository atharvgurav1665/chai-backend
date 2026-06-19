import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username :{
            type:String,
            required : true,
            unqiue:true,
            lowercase :true,
            trim :true,
            index : true,
        },
        email : {
            type :String,
            required : true, 
            unique : true,
            lowercase : true,
            trim: true,
        },
        fullName : {
            type : String,
            required :true,
            trim : true,
            index : true,
        },
        avatar : {
            type: String,  //calodinary url [is what used here ]
            required : true,
        },
        coverImage : {
             type: String,
        },
        watchHistory :[
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required : [true,'Password is Required '],
        },
        refreshToken : {
            type : String,
        }


    },
    {
        timestamps:true
    }
)
// userSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});
// userSchema.pre("save",async function (next) {
//     if(!this.isModified("password")) return next();
//     //yaha pe agar modification nahi hua ho tab hi aage jayega password 
//     this.password = await bcrypt.hash(this.password,10)
//     next()    //wapas fir se har bar password chnage karega sirf ye 
//     //agar password medifation ho to hipassword chnage hona chiaye

// })

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function() {
    jwt.sign({
            _id:this._id,
            email:this.emai,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}
userSchema.methods.generateRefreshToken = function() {
        jwt.sign({
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn : process.env.REFRESH_TOKEN_SECRET
        }
    )
}




export const User = mongoose.model("User",userSchema)
