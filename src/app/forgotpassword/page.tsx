"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";


export default function ForgotPasswordPage() {
  const [user, setUser] = useState({ email: "" });

  const onSubmit = async () => {
    try {
      if (user.email.trim() === '' ) {
        toast.warn('Please fill the field Email');
        return;
      }
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Send Mail Succesfully", response.data);
      toast.success("Send Mail Succesfully");
    } catch (error: any) {
      console.log( error.message);
      if(error.response &&
        error.response.data &&
        error.response.data.error ===
          "Given Email Does not exist"){
            toast.warn("Given Email Does not exist.");
      }else{
      console.log("Submit Failed", error.message);
      toast.error("Submit Failed");
      }
    }
  };
  return (
    <div className="w-[400px] px-10 rounded-lg py-10 bg-white ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium">Forgot Password</h1>
        <p className="mt-2">Enter your Register Email</p>
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  text-black mb-6"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <button
          onClick={onSubmit}
          className="p-2 border border-gray-300 bg-violet-700 hover:bg-violet-500 text-white rounded-lg mb-4 "
        >
          Submit
        </button>
        <div className="text-center mt-6 ">
          <Link href="/login" className="text-slate-800">
            Back to <span className="underline">LOGIN</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
