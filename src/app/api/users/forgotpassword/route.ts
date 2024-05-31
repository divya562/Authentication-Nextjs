import {connect} from '@/dbconfig/dbconfig'
import { NextRequest , NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
 
        // console.log(user._id)
        if (user) {

           await sendEmail({email, emailType:"RESET", userID:user._id})

    return NextResponse.json({
        message:"Email Send Successfuly",
        success: true
    })
          }
      else{
        return NextResponse.json(
            { error: "Given Email Does not exist" },
            { status: 400 }
          );
      }

       
    // await sendEmail({email, emailType:"RESET", userID:user._id})

    // return NextResponse.json({
    //     message:"Email Send Successfuly",
    //     success: true
    // })


    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}