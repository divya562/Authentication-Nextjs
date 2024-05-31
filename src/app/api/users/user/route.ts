import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
connect();


export async function GET(request:NextRequest){
    try {
        const userID = await getDataFromToken(request)
        const user = await User.findOne({_id:userID}).select("-password")
        console.log(user)
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:400}
        )
    }
}
