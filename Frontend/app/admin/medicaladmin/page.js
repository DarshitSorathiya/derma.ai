"use client";
import POrder from "@/components/POrder";
import Link from "next/link";
import React, { useState } from "react";

const MedicalAdminPage = () => {
  const [userType, setUserType] = useState("dashboard"); // default selection
  const [addItem, setAddItem] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);

  const renderContent = () => {
    switch (userType) {
      case "profile":
        return (
          <div className="flex flex-col gap-4  text-xl rounded-l-xl  p-4">
            <div className="border-b border-gray-300 w-full"></div>

            <div className="flex gap-4">
              {/* <div className="bg-[#116BA3] w-1/3 h-20 opacity-30"></div> */}
              <div className=" flex gap-4 items-center justify-between w-full">
                <div className="mt-4  flex-1" >
                  <p><span className=' font-bold'>Name:</span> John Doe</p>
                  <p><span className=' font-bold'>Email:</span> johndoe@example.com</p>
                </div>
                {/* <div className="border-b border-gray-300 w-full my-4"></div> */}
                <div className="  ">
                  <button className="bg-[#116BA3] text-white p-2 rounded-full">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 w-full"></div>

            {/* <div className=' flex gap-2'>
              <span className=' font-bold'>Specialization :</span>
              <p>Lorem ipsum dolor sit amet.</p>
          </div> */}

            <div className=''><span className=' font-bold'>Address :</span>
              Lorem, ipsum dolor sit amet consectetur adipisicindignissimos voluptates harum libero est
            </div>

            <div className=' mx-6 mt-3'>
              <Link href={"/admin/doctoradmin/patientdetails"}>
                <button className=' bg-blue-400 hover:bg-[#116BA3] p-2 px-8 rounded-2xl text-xl text-white'>Add Licence</button>
              </Link>
            </div>

            <div className=' m-6 gap-3 grid grid-cols-2'>
              {Array(8).fill(0).map((_, index) => (
                <div className=' flex justify-center items-center bg-blue-100 w-full h-52 ' key={index}>
                  Licence
                </div>
              ))}
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="flex flex-col gap-4  text-xl rounded-l-xl  p-4">
            <h2 className="text-3xl font-bold text-center">Dashboard</h2>

            <div className=" flex gap-80 m-10 items-center justify-center">

              <div className=" flex flex-col gap-2 w-48 h-48 justify-center bg-blue-100 p-8 rounded-xl">
                <div className=" flex justify-center items-center text-center">income by day</div>
                <div className=" text-center">10000 Rs.</div>
              </div>
              <div className=" flex flex-col gap-2 w-48 h-48 justify-center bg-blue-100 p-8 rounded-xl">
                <div className=" flex justify-center items-center text-center">income by month</div>
                <div className=" text-center">10000 Rs.</div>
              </div>

            </div>

            <div className=" flex flex-col gap-2">

              <div className=" flex gap-4 my-4">
                <div className=" text-2xl font-bold">Pending Order :</div>
                <div className=" text-2xl font-semibold"> 100 Orders</div>
              </div>

              {Array(8).fill(0).map((_, index) => (
                <Link href={"/admin/medicaladmin/orderdetails"} key={index}>
                  <POrder key={index} />
                </Link>
              ))}

            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="flex flex-col gap-4  text-xl rounded-l-xl  p-4">

            <h2 className="text-3xl text-center font-bold">Inventory</h2>

            <div className='flex justify-center items-center gap-96'>

              <div>
                <button onClick={() => setAddItem(prev => !prev)} className={`${addItem ? ' bg-[#116BA3]' : ' hover:bg-blue-400 bg-[#116BA3]'} p-2 px-8 rounded-2xl text-2xl text-white`}>Add Item</button>
              </div>
              <div>
                <button onClick={() => setRemoveItem(prev => !prev)} className={`${removeItem ? 'bg-[#116BA3]' : 'bg-blue-400 hover:bg-[#116BA3]'} p-2 px-8 rounded-2xl text-2xl text-white`}>Remove Item</button>
              </div>

            </div>

            <div className=" flex m-4  mx-24 justify-between items-center">

              <div>
                {addItem &&
                  <div className=" flex gap-4 w-fit">

                    <div className=" flex gap-5 flex-col">

                      <div className="flex "> Name:</div>
                      <div className="flex "> Amount:</div>
                      <div className="flex "> Expiry Date:</div>

                    </div>

                    <div className=" flex flex-col gap-2">

                      <input type="text" placeholder='Enter Medicine Name' className='w-80 px-4 py-2 text-sm bg-blue-100 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-400 dark:border-gray-700' />
                      <input type="text" placeholder='Enter Amount' className='w-80 px-4 py-2 text-sm bg-blue-100 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-400 dark:border-gray-700' />
                      <input type="text" placeholder='Enter Expiry Date' className='w-80 px-4 py-2 text-sm bg-blue-100 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-400 dark:border-gray-700' />

                    </div>

                  </div>
                }
              </div>
              <div>
                {removeItem &&
                  <div className=" flex gap-4 w-fit">

                    <div className=" flex gap-5 flex-col">

                      <div className="flex "> Name:</div>

                    </div>

                    <div className=" flex flex-col gap-2">

                      <input type="text" placeholder='Enter Medicine Name' className='w-80 px-4 py-2 text-sm bg-blue-100 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-400 dark:border-gray-700' />

                    </div>

                  </div>
                }
              </div>

            </div>



            <div>

              <form className="max-w-md mx-auto ">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                <div className="relative">

                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>

                  <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />

                  <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#116BA3] dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

                </div>
              </form>

            </div>

            <div>
              <div className=" text-2xl font-semibold">
                Out OF Stock
              </div>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  const navItemClass = (type) => {
    return `w-full text-center p-2 cursor-pointer ${userType === type ? "font-bold text-black" : ""
      }`;
  };

  return (
    <div className="flex gap-4 bg-[#116BA3]">
      {/* Sidebar Navigation */}
      <div className="bg-white m-2 sticky top-20 h-[610px] flex flex-col p-4 items-center gap-4 text-2xl rounded-r-xl w-1/5">
        <div onClick={() => setUserType("profile")} className={navItemClass("profile")}>
          <button>Profile Picture</button>
        </div>
        <div onClick={() => setUserType("dashboard")} className={navItemClass("dashboard")}>
          <button>Dashboard</button>
        </div>
        <div onClick={() => setUserType("inventory")} className={navItemClass("inventory")}>
          <button>Inventory</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" bg-white m-2 rounded-2xl w-4/5">
        {renderContent()}
      </div>
    </div>
  );
};

export default MedicalAdminPage;
