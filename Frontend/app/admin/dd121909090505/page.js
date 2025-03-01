"use client"
import ApplicationDoctor from '@/components/ApplicationDoctor'
import ApplicationMedical from '@/components/ApplicationMedical'
import React from 'react'

const dd121909090505 = () => {
    return (
        <>
            <div className=' text-4xl m-6 font-bold text-[#116BA3] flex justify-center items-center'>
                <span className=' bg-white p-2 rounded-xl text-6xl '>Admin Panel</span>
            </div>

            <div className=' bg-white m-4 rounded-xl p-4 text-xl text-[#116BA3]'>
                <div className=' flex justify-between items-center text-2xl font-semibold'>
                    <div className=' text-4xl'>Dashboard</div>
                    <div>
                        <button className=' bg-[#116BA3] hover:bg-blue-600 p-2 px-8 rounded-2xl text-xl text-white'>View All</button>
                    </div>
                </div>

                <div className=' flex mx-24 justify-center items-center gap-20 mt-6'>

                    <div>

                        <div className=' mx-10 font-semibold '>Pending Application</div>
                        <div className=" flex m-10 items-center gap-12 justify-center">

                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Doctor</div>
                                <div className=" text-center">Application</div>
                                <div className=" text-center">09</div>
                            </div>
                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Medical</div>
                                <div className=" text-center">Application</div>
                                <div className=" text-center">05</div>
                            </div>
                        </div>

                    </div>

                    <div>

                        <div className=' mx-10 font-semibold'>Approved Application</div>
                        <div className=" flex m-10 items-center gap-12 justify-center">

                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Doctor</div>
                                <div className=" text-center">Application</div>
                                <div className=" text-center">09</div>
                            </div>
                            <div className=" flex flex-col gap-2 w-48 h-48 font-semibold justify-center bg-blue-100 p-8 rounded-xl">
                                <div className=" flex justify-center items-center text-center">Medical</div>
                                <div className=" text-center">Application</div>
                                <div className=" text-center">05</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className=' flex gap-4 flex-col'>

                    <ApplicationDoctor />
                    <ApplicationMedical />
                </div>

            </div>
        </>
    )
}

export default dd121909090505
