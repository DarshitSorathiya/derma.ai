import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const TeleCard = () => {
    return (
        <>
            <div className=' flex mx-8 my-2 bg-white rounded-xl'>
                <div className=' w-52 h-44 bg-slate-200 rounded-xl '>
                    {/* <Image /> */}
                </div>

                <div className=' flex w-full justify-between'>

                    <div className=' mx-8 my-2 space-x-4 w-full'>

                        <div className=' text-3xl flex justify-between gap-10 w-full font-bold '>
                            <span>Name: Dharmik Sakhiya</span>
                            <span className=''>Age : 20</span>

                        </div>
                        <div className=' text-xl'>Specialization</div>
                        <div className=' text-gray-500 text-xl '>Details: Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nesciunt.</div>

                    </div>

                    <div className=' flex justify-center items-center w-52 border-l-4'>
                            <Link href='/'>
                                <button type="button" className="text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 bg-white border-2">Call</button>
                            </Link>
                    </div>

                </div>


            </div>
        </>
    )
}

export default TeleCard
