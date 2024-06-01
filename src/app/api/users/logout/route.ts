import { NextRequest, NextResponse } from "next/server";

export default async function GET(_request:NextRequest){
    try {
        const response= NextResponse.json({
            message:"LogOut Succesfully",
            success:true
        })
        response.cookies.set("token","", {httpOnly:true, expires:new Date(0)})
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}