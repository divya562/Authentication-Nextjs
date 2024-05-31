import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { toast } from 'react-toastify';

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("fjcdfdf");
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody + "xnsjxn");
    const existingUserVerifiedByEmail = await User.findOne({ email});

    if (existingUserVerifiedByEmail) {
      
      return NextResponse.json(
        {
          error: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    // Additional check for username
    const existingUserVerifiedByUsername = await User.findOne({ username });

    if (existingUserVerifiedByUsername) {
  
      return NextResponse.json(
        {
          error: "User already exists with this username",
        },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("fjcdfdf");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyCode: verifyCode
    });
    
    console.log("fjcdfdf");
    const saveUser = await newUser.save();
    console.log(saveUser);

    //send verification email
   const emailnot =  await sendEmail({email, emailType:"VERIFY", userID:saveUser._id ,verifyCode})
   console.log(emailnot);
  
   
    return NextResponse.json({
      message: "user created Succesfully",
      success: true,
      saveUser,
    });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
