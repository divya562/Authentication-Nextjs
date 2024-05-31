"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("false");
  const [userdata, setUser] = useState({
    password: "",
    confirmpassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const onResetpassword = async () => {
    try {
      if (
        userdata.password.trim() === "" ||
        userdata.confirmpassword.trim() === ""
      ) {
        toast.warn("Please fill the fields.");
        return;
      }
     
      if (userdata.password !== userdata.confirmpassword) {
        toast.warn("Passwords do not match");
        return;
      }
      const response = await axios.post("/api/users/resetpassword", {
        userdata,
        token,
      });
      console.log("Password Reset Successfully", response.data);
      toast.success("Password Reset Successfully");
      router.push("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invalid token"
      ) {
        toast.error("Invalid token");
      } else {
        console.log("Password Reset failed", error.message);
        toast.error("Password Reset failed", error.message);
      }
    }
  };

  const handlePasswordChange = (e: any) => {
    setUser({ ...userdata, password: e.target.value });
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="w-[400px] px-10 rounded-lg py-10 bg-white ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium">Reset Password</h1>
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  text-black mb-6"
          id="password"
          type="password"
          value={userdata.password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
         {passwordError && (
          <p className="text-sm text-red-500 mb-2">{passwordError}</p>
        )}
        <label>Confirm Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  text-black mb-6"
          id=" confirmpassword"
          type="password"
          value={userdata.confirmpassword}
          onChange={(e) => setUser({ ...userdata, confirmpassword: e.target.value })}
          placeholder="confirm password"
        />

        <button
          onClick={onResetpassword}
          className="p-2 border border-gray-300 bg-violet-700 hover:bg-violet-500 text-white rounded-lg mb-4 "
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
