import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userdata, token } = reqBody;
    const {password, confirmpassword} =userdata
    console.log(reqBody);
    console.log(userdata);
    console.log(password);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log(user);

    // if (password === confirmpassword) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      console.log(hashedPassword);
      user.password = hashedPassword;
    const updatedUser = await user.save();
      // const newUser = new User({
      //   password: hashedPassword,
      // });

      // const saveUser = await newUser.save();
      console.log(updatedUser);
    // }

    return NextResponse.json({
      message: "password change Succesfully",
      success: true
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
