"use client";
import { useState } from "react"; 
import { motion } from "framer-motion";
import Link from "next/link";

const ApplicationMedical = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left w-full">
            {/* ApplicationMedical Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white bg-[#116BA3] hover:bg-[#116BA3] focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:bg-[#116BA3] 
                dark:hover:bg-[#116BA3] dark:focus:ring-blue-800 w-full justify-between"
            >
                <span>Application For Medical</span>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {/* ApplicationMedical Menu with Framer Motion */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }} // Start hidden
                    animate={{ opacity: 1, y: 0 }} // Fade in & move down
                    exit={{ opacity: 0, y: -10 }} // Fade out & move up
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                    className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg w-full shadow-sm text-blue-600"
                >
                    <ul className="py-2 text-lg w-full flex flex-col gap-2 ">
                        <li className='flex text-2xl m-4 font-semibold'>
                            <div className=' text-center w-1/4'>Name</div>
                            <div className=' text-center w-1/4'>Certificate</div>
                            <div className=' text-center w-1/4'>Date</div>
                            <div className=' text-center w-1/4'></div>
                        </li>
                        {Array(8).fill(0).map((_, index) => (
                            <li key={index}>
                                <div className='flex text-xl'>
                                    <div className=' text-center w-1/4'>Om</div>
                                    <div className=' text-center w-1/4'>Certified</div>
                                    <div className=' text-center w-1/4'>29/02/2025</div>
                                    <div className=' text-center w-1/4'>
                                        <Link href={"/admin/dd121909090505/applmedical"}>
                                            <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-xl text-white'>View</button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default ApplicationMedical;
