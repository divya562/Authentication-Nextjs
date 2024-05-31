import moongose from 'mongoose';

const userSchema = new moongose.Schema({
        username:{
            type:String,
            required:[true,"Please provide a username"],
            unique:true

        },
        email:{
            type:String,
            required:[true,"Please provide a username"],
            unique:true
        },
        password:{
            type:String,
            required:[true, "Please provide a Password"]
        },
        verifyCode: {
            type: String,
            minLength: 6
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgotPasswordToken:String,
        forgotPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date
})
 const User = moongose.models.User || moongose.model("User", userSchema)
 
 export default User;