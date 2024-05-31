"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userVerify, setUserVerify] = useState(false);
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/user");
      console.log(res.data);
      console.log(res.data.data);
      console.log(res.data.data.username);
      // console.log(res.data.data.email);
      setUserName(res.data.data.username);
      setUserEmail(res.data.data.email);
      setUserVerify(res.data.data.isVerified);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-[400px] px-10 rounded-lg py-10 bg-white ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium">Profile</h1>
      </div>
      <hr />
      {/* <label htmlFor="">Token</label>
            <h2 className="bg-yellow-200">{data === 'Nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2> */}
      <hr />

      <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2" htmlFor="token">
            Token:
          </label>
          <div className="bg-yellow-200 inline-block px-4 py-2 rounded">
            {data === "Nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`} className="text-blue-600">
                {data}
              </Link>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="username"
          >
            UserName:
          </label>
          <div className="text-gray-800">{userName}</div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email:
          </label>
          <div className="text-gray-800">{userEmail}</div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            Verification:
          </label>
          <div
            className={`text-sm font-semibold ${
              userVerify  ? "text-green-600" : "text-red-600"
            }`}
          >
            {userVerify  ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={getUserDetails}
          className="bg-green-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Get User Details
        </button>

        <button
          onClick={logOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          LogOut
        </button>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">

    // </div>
  );
}
