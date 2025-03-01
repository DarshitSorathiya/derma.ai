"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { usePathname } from "next/navigation";

const RegisterPage = () => {
  const pathname = usePathname(); // Get current route
  const [userType, setUserType] = useState("patient"); // 'patient' maps to backend "user"
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phoneNo: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   // Mapping frontend userType to backend schema
  //   const schemaTypeMap = {
  //     patient: "user",
  //     doctor: "doctor",
  //     medical: "medical",
  //   };
  //   const schemaType = schemaTypeMap[userType];

  //     console.log("Sending request with data:", formData, "SchemaType:", schemaType);

  //     const response = await axios.post(`/api/register`, formData,{});

  //     console.log("Response received:", response);
  //     alert(response.data.message);

  // }

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    const schemaTypeMap = {
      patient: "user",
      doctor: "doctor",
      medical: "medical",
    };
    const schemaType = schemaTypeMap[userType];

    try {
      setPending(true);
      const res = await fetch(`/api/register?schemaType=${schemaType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status); // Log response status

      if (res.ok) {
        console.log("Successfully registered");
        setPending(false);
        e.target.reset();
        // router.push(`/loginuser`);
      } else {
        const errorData = await res.json();
        console.log("Error response:", errorData); // Log error response
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setPending(false);
      setError("Something went wrong.");
    }
  };

  return (
    <>

      <div className="text-xl flex">
        {/* Left Side Panel */}
        <div className="p-8 w-full flex flex-col min-h-screen items-center justify-center">
          <h1 className="text-4xl font-bold text-black">
            Register to <br />
            <span className="text-black">get your nutrients</span>
            <p className="text-gray-700 mt-4 text-lg">
              If you already have an account{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Login here!
              </Link>
            </p>
          </h1>
        </div>

        {/* Right Side Form */}
        <div className="w-full">
          <div className="flex justify-center flex-col items-center min-h-screen">

            <h1 className="text-2xl font-bold text-gray-900 text-center m-6">
              Welcome {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h1>
            {/* User Type Selection */}
            <div className="bg-white h-16 mx-10 mb-0 rounded-3xl flex text-blue-600 gap-4 justify-center items-center text-2xl font-semibold">
              {/* <div className="w-full text-center text-4xl font-extrabold">You are :</div> */}

              {["doctor", "medical", "patient"].map((type) => (
                <div key={type} onClick={() => setUserType(type)} className="w-full text-center">

                  <button className={`rounded-2xl p-2 px-3 text-white ${userType === type ? "bg-blue-600" : "bg-blue-400 hover:bg-blue-600"}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>

                </div>
              ))}
            </div>

            <form onSubmit={handleRegister} className="bg-opacity-20 backdrop-blur-md px-8 rounded-2xl w-96">

              {/* Input Fields */}
              {["username", "fullname", "email", "gender", "phoneNo"].map((field) => (
                <div className="relative mt-4" key={field}>
                  <input type="text" name={field} placeholder={`Enter ${field}`} value={formData[field]} onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700" />
                </div>
              ))}

              {/* Password */}
              <div className="relative mt-4">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700" />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Date of Birth */}
              <div className="relative mt-4">
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700" />
              </div>

              {/* Doctor/Pharmacist Specific Fields */}
              {userType === "doctor" && (
                <div className="relative mt-4">
                  <input type="text" name="speciality" placeholder="Enter Speciality" className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700" onChange={handleChange} />
                </div>
              )}
              {userType === "medical" && (
                <div className="relative mt-4">
                  <input type="text" name="address" placeholder="Enter Address" className="w-full p-3 bg-gray-100 rounded-xl outline-none text-gray-700" onChange={handleChange} />
                </div>
              )}

              {/* Register Button */}
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Register
              </button>

              {/* Social Logins */}
              <div className="text-center mt-4 text-gray-500 text-sm">Or continue with</div>
              <div className="flex justify-center gap-4 mt-4">
                <button className="p-3 bg-black rounded-full shadow-md"><FaGoogle className="text-white text-xl" /></button>
                <button className="p-3 bg-gray-100 rounded-full shadow-md"><FaApple className="text-black text-xl" /></button>
                <button className="p-3 bg-gray-100 rounded-full shadow-md"><FaFacebookF className="text-blue-600 text-xl" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
