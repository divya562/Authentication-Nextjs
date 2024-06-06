import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication App",
  description: "Authentication SignUp/ Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row w-full h-screen ">
        <div className="hidden md:block h-full  w-50 rounded ">
          <img className="h-full w-full " src="https://cdn.dribbble.com/userupload/14898990/file/original-ba68e98ea10e1867e831884c3b153387.png?resize=752x" alt="" />
        </div>
        <div className="h-full md:w-1/2 p-5 flex justify-center items-center">
      {/* <div className="bg-cover bg-center h-screen m-0 flex items-center justify-center" style={{ backgroundImage: `url("/img.jpg")` }}> */}
      {/* <div className="bg-cover bg-center h-screen m-0 flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 "> */}
      <ToastContainer />
        {children}
        </div>
       
        </div>
        </body>
    </html>
  );
}
