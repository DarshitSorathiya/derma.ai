"use client"
import DAppointment from '@/components/DAppointment';
import POrder from '@/components/POrder';
import Link from 'next/link';
import React, { useState } from 'react'



const DoctorAdminPage = () => {
    const [userType, setUserType] = useState("dashboard"); // default selection
    const [addItem, setAddItem] = useState(false);
    const [removeItem, setRemoveItem] = useState(false);

    const renderContent = () => {
        switch (userType) {
            case "profile":
                return (
                    <div className="flex flex-col gap-4 text-blue-600 text-xl rounded-l-xl  p-4">
                        <div className="border-b border-gray-300 w-full"></div>

                        <div className="flex gap-4">
                            {/* <div className="bg-blue-600 w-1/3 h-20 opacity-30"></div> */}
                            <div className=" flex gap-4 items-center justify-between w-full">
                                <div className="mt-4  flex-1" >
                                    <p><span className=' font-bold'>Name:</span> John Doe</p>
                                    <p><span className=' font-bold'>Email:</span> johndoe@example.com</p>
                                </div>
                                {/* <div className="border-b border-gray-300 w-full my-4"></div> */}
                                <div className="  ">
                                    <button className="bg-blue-600 text-white p-2 rounded-full">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-300 w-full"></div>

                        <div className=' flex gap-2'>
                            <span className=' font-bold'>Specialization :</span>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>

                        <div className=''><span className=' font-bold'>Details :</span>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio quo eius vel officia harum eum iure aut doloribus dolor sint accusamus consequuntur, explicabo icia at, maxime, veritatis molestiae nam? Ut magni, dolore iusto ipsum quasi soluta fuga repellat ipsa eveniet veritatis provident porro id maiores minima labore quis nesciunt numquam ea necessitatibus! Odit recusandae cupiditate accusamus modi qui quidem voluptate, perspiciatis dignissimos voluptates harum libero est
                        </div>

                        <div className=' mx-6 mt-3'>
                            <Link href={"/admin/doctoradmin/patientdetails"}>
                                <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-xl text-white'>Add Certificate</button>
                            </Link>
                        </div>

                        <div className=' m-6 gap-3 grid grid-cols-2'>
                            {Array(8).fill(0).map((_, index) => (
                                <div className=' flex justify-center items-center bg-blue-100 w-full h-52 ' key={index}>
                                    Certificate
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "dashboard":
                return (
                    <div className="flex flex-col gap-4 text-blue-600 text-xl rounded-l-xl  p-4">
                        <div className=' flex items-center gap-48 justify-between '>

                            <h2 className="text-4xl font-bold">Dashboard</h2>
                            <h1 className=' font-bold'>Date : 19/09/2005</h1>

                        </div>

                        <div className=" flex m-10 items-center gap-80 justify-center">

                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Pending</div>
                                <div className=" text-center">Appointments</div>
                                <div className=" text-center">09</div>
                            </div>
                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Completed</div>
                                <div className=" text-center">Appointments</div>
                                <div className=" text-center">05</div>
                            </div>

                        </div>

                        <div className=" flex flex-col gap-2">

                            <div className=" flex gap-4 my-4 justify-center">
                                <div className=" text-2xl font-bold">You may have following appointments today</div>
                                {/* <div className=" text-2xl font-semibold"> 100 Orders</div> */}
                            </div>


                            <div className='flex text-2xl font-semibold'>
                                <div className=' text-center w-1/4'>Name</div>
                                <div className=' text-center w-1/4'>Age</div>
                                <div className=' text-center w-1/4'>App. Time</div>
                                <div className=' text-center w-1/4'></div>
                            </div>

                            {Array(8).fill(0).map((_, index) => (
                                <Link href={"/admin/doctoradmin"} key={index}>
                                    <DAppointment key={index} />
                                </Link>
                            ))}

                        </div>
                    </div>
                );
            case "mypatient":
                return (
                    <div className="flex flex-col gap-4 text-blue-600 text-xl rounded-l-xl  p-4">

                        <h2 className="text-3xl text-center font-bold">My Patient</h2>

                        <div className='flex text-2xl font-semibold'>
                            <div className=' text-center w-1/5'>Name</div>
                            <div className=' text-center w-1/5'>Age</div>
                            <div className=' text-center w-1/5'>App. Time</div>
                            <div className=' text-center w-1/5'>Date</div>
                            <div className=' text-center w-1/5'>Datails</div>
                        </div>

                        {Array(8).fill(0).map((_, index) => (
                            <div key={index}>
                                <div className='flex text-xl'>
                                    <div className=' text-center w-1/5'>Om</div>
                                    <div className=' text-center w-1/5'>20</div>
                                    <div className=' text-center w-1/5'>9:20 to 10:20</div>
                                    <div className=' text-center w-1/5'>19/09/2005</div>
                                    <div className=' text-center w-1/5'>
                                        <Link href={"/admin/doctoradmin/patientdetails"}>
                                            <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-xl text-white'>View</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const navItemClass = (type) => {
        return `w-full text-center p-2 cursor-pointer ${userType === type ? "font-bold text-black" : "text-blue-600"
            }`;
    };

    return (
        <div className="flex gap-4 bg-[#116BA3]" >
            {/* Sidebar Navigation */}
            <div className="bg-white m-2 sticky top-20 h-[610px] flex flex-col p-4 items-center gap-4 text-2xl rounded-r-xl w-1/5">
                <div onClick={() => setUserType("profile")} className={navItemClass("profile")}>
                    <button>Profile Picture</button>
                </div>
                <div onClick={() => setUserType("dashboard")} className={navItemClass("dashboard")}>
                    <button>Dashboard</button>
                </div>
                <div onClick={() => setUserType("mypatient")} className={navItemClass("mypatient")}>
                    <button>My Patient</button>
                </div>
            </div>
            {/* Main Content Area */}
            <div className=" bg-white m-2 rounded-2xl w-4/5">
                {renderContent()}
            </div>
        </div>
    );
};

export default DoctorAdminPage
