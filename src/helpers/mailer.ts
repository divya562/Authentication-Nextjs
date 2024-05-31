import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail= async ({email, emailType, userID, verifyCode}:any)=>{
    try {
        //create Hash Token

      const hashedToken =  await bcryptjs.hash(userID.toString(), 10)

      if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userID,
           { verifyToken:hashedToken,
            verifyTokenExpiry: Date.now() +3600000}
        )
      }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userID,
            { forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry: Date.now() +3600000}
         )
      }

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fa09de96695c0b",
          pass: "506749ca06bc06"
        }
      });

      const mailOption ={
        from:'divyabagul48@gmail.com',
        to:email,
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset Your password",
        html: ` <div class="max-w-lg mx-auto p-6 bg-white rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
        <p class="text-gray-700 mt-4">
            Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}" class="text-blue-500">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br>
            <span class="text-sm">${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</span>
        </p>
        ${emailType === "VERIFY" ? `<div class="font-bold mt-4">OTP : ${verifyCode}</div>` : ""}
    </div>`
      }

      const mailResponse = await transport.sendMail(mailOption);
      return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}