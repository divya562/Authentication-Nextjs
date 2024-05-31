"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    verifyCode: "",
  });
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const onVerify = async () => {
    try {
            if (user.verifyCode.trim() === '' ) {
        toast.warn('Please fill the field OTP');
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", {
        user,
        token,
      });
      setVerified(true);
      console.log("Verify Success", response.data);
      toast.success("Verify Email Successfully!");
      router.push("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invalid OTP"
      ) {
        toast.error("Invalid OTP");
      } else {
        console.log("Verification failed", error.message);
        toast.error("Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // const VerifyUserEmail = async()=>{
  //     try {
  //         await axios.post('/api/users/verifyemail', {token})
  //         setVerified(true)
  //     } catch (error:any) {

  //         console.log(error.response.data)
  //     }
  // }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect (()=>{
  //     if(token.length>0){
  //         VerifyUserEmail()
  //     }
  // }, [token])

  useEffect(() => {
    if (user.verifyCode.length > 0 && token.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, token]);

  return (
    <div className="w-[400px] px-10 rounded-lg py-10 bg-white ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium">
          {loading ? (
            <ClipLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Verify Email"
          )}
        </h1>
      </div>

      <div className="flex flex-col">
        <label>OTP</label>
        <input
          className="p-2 border border-gray-300 rounded-lg text-black mb-6"
          id="number"
          type="number"
          value={user.verifyCode}
          onChange={(e) => setUser({ ...user, verifyCode: e.target.value })}
          placeholder="OTP"
        />
        <button
          onClick={onVerify}
          className="p-2 border border-gray-300 bg-violet-700 hover:bg-violet-500 text-white rounded-lg mb-4 "
        >
          {buttonDisabled ? "No Verify" : "Verify"}
        </button>
      </div>
    </div>
  );
}
