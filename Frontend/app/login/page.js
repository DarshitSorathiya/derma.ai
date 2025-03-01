'use client'

import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import Link from 'next/link';


const loginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className=' text-xl flex '>
        <div className="p-8 bg-gradient-to-r w-full flex flex-col min-h-screen items-center justify-center">
          <h1 className="text-4xl font-bold text-black">
            Login to <br />
            <span className="text-black">get your nutrients</span>
            <p className="text-gray-700 mt-4 text-lg">
              if you already have an account <br />
              you can{" "}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                Register here!
              </Link>
            </p>
          </h1>
        </div>

        <div className=' w-full'>
          <div className="flex justify-center items-center min-h-screen">
            <div className=" bg-opacity-20 relative backdrop-blur-md p-8 rounded-2xl w-96">


              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Welcome
              </h1>

              {/* Email Input */}
              <div className="relative mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700"
                />
                {email && (
                  <MdClose
                    onClick={() => setEmail("")}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                )}
              </div>

              {/* Password Input */}
              <div className="relative mt-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Forgot Password */}
              <p className="text-gray-400 text-sm text-center mt-3">Having Problem ?</p>

              {/* Register Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Log In
              </button>

              {/* Or Continue With */}
              <div className="text-center mt-4 text-gray-500 text-sm">Or continue with</div>

              {/* Social Login Icons */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="p-3 bg-black  rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                  <FaGoogle className="  text-white hover:text-black text-xl" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                  <FaApple className="text-black text-xl" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                  <FaFacebookF className="text-blue-600 text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default loginPage
