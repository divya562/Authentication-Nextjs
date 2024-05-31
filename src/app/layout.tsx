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
      <div className="bg-cover bg-center h-screen m-0 flex items-center justify-center" style={{ backgroundImage: `url("/img.jpg")` }}>
      {/* <div className="bg-cover bg-center h-screen m-0 flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 "> */}
      <ToastContainer />
        {children}
        </div></body>
    </html>
  );
}
