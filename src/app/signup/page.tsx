"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      if (
        user.username.trim() === "" ||
        user.email.trim() === "" ||
        user.password.trim() === ""
      ) {
        toast.warn("Please fill the fields.");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", response.data);
      toast.success("SignUp Successfully!  Check your mail and Verify");
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp failed", error.response.data.error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "User already exists with this email"
      ) {
        toast.error("User already exists with this email");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error === "User already exists with this username"
      ) {
        toast.error("User already exists with this username");
      } else {
        console.log("SignUp failed", error.message);
        toast.error("Sign up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handlePasswordChange = (e: any) => {
    setUser({ ...user, password: e.target.value });
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

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
            "Sign Up"
          )}
        </h1>
      </div>
      <div className="flex flex-col">
        <label>Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg text-black mb-6"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label>Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg text-black mb-6"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label>Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg text-black mb-6"
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
          onClick={onSignup}
          className="p-2 border border-gray-300 bg-violet-700 hover:bg-violet-500 text-white rounded-lg mb-4 "
        >
          Sign Up
        </button>
        <hr />
        <div className="text-center mt-6 ">
          <Link href="/login" className="text-slate-800">
            Already have an account?<span className="underline">LOGIN</span>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
}
