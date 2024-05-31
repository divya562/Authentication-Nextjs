import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, user } = reqBody;
    const { verifyCode } = user;
    console.log(token);
    console.log(verifyCode);

    const userdata = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
      verifyCode: verifyCode,
    });
    console.log(userdata);
    if (!userdata) {
      return NextResponse.json(
        {
          error: "Invalid OTP",
        },
        { status: 400 }
      );
    }

    console.log(user);

    userdata.isVerified = true;
    userdata.verifyToken = undefined;
    userdata.verifyTokenExpiry = undefined;
    await userdata.save();

    return NextResponse.json({
      message: "Email Verified Successfuly",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
