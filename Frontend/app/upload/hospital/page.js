import Decrypted from '@/components/ui/Decrypted'
import Link from 'next/link'
import React from 'react'


const hospitaPage = () => {
    return (
        <>
            <div className=' text-3xl flex justify-center items-center font-bold m-4'>Hospital Name</div>

            <div className=' flex gap-5 m-10 justify-center items-center'>

                <div className='bg-[#116BA3] rounded-2xl w-full py-64 mx-24 h-full'></div>

                <div className=' w-full'>

                    <div className="w-full p-3 text-xl flex flex-col justify-center max-h-96 gap-2 rounded-xl">

                        <span className="">Text</span>
                        <p className="line"></p>
                        <span className="">Text</span>
                        <p className="line"></p>
                        <span className="">Text</span>
                        <p className="line"></p>
                        <span className="">Text</span>

                    </div>

                    <div className=' flex justify-center items-center p-8'>
                        <Link href='/upload/hospital/appointmentbook'>
                            <button type="button" className="text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 bg-white border-2">Book Appointment</button>
                        </Link>
                    </div>


                </div>

            </div>

        </>
    )
}

export default hospitaPage
