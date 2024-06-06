"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoginPage() {
  const router = useRouter();
  // const toast = useToaster()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      if (user.email.trim() === '' || user.password.trim() === '') {
        toast.warn('Please fill in both email and password fields.');
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Succesfully", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error ===
          "User does not exist with the provided email."
      ) {
        toast.warn("User does not exist with the provided email.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invalid password"
      ) {
        toast.warn("Invalid password");
      } else {
        toast.error(error.message,);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: any) => {
    setUser({ ...user, password: e.target.value });
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

 
  return (
    <div className="w-[400px]  bg-white ">
      <div className="text-center mb-20">
        <h1></h1>
        <h1 className="text-4xl font-bold">
          {loading ? (
            <ClipLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Welcome Back"
          )}
        </h1>
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <input
          className="p-2 border border-gray-300  text-black mb-8"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label>Password</label>
        <input
          className="p-2 border border-gray-300   text-black mb-8"
          id="Password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
         {passwordError && (
          <p className="text-sm text-red-500 mb-2">{passwordError}</p>
        )}
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 bg-violet-500 hover:bg-violet-700 text-white rounded mb-6 "
        >
         LOGIN
        </button>

        <div className="text-end mb-10 text-slate-500">
          <Link href="/forgotpassword">Forgot Password?</Link>
        </div>
        <hr />
        <div className="text-center mt-6 ">
          <Link href="/signup" className="text-slate-800 ">
            Need an account?<span className="underline hover:text-violet-500">SIGN UP</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
