import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Decrypted from './ui/Decrypted'


function HeaderPoster() {
    return (
        <>
            <div className="header-poster w-full h-96 flex">

                <div className=' flex flex-col h-96 justify-center items-center  w-full p-20'>
                    
                    <span className=' text-7xl font-bold'>Welcome to</span>

                    <span className=' text-[#116BA3] text-6xl font-bold lowercase'>DERMA.AI</span>

                    {/* <div className=' my-6'>
                        <Link href="/upload" className=' font-bold '>
                            <button className='hover:bg-white bg-blue-300 w-fit p-2 border-2 border-slate-500 hover:border-slate-800 rounded-xl'>
                                Upload Photo
                            </button>
                        </Link>
                    </div> */}

                    <div className=' my-6 text-[#116BA3]'>
                        <Link href='/upload'>
                            <button type="button" className="text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-[#116BA3] dark:text-[#116BA3] dark:hover:text-white dark:hover:bg-[#116BA3] dark:focus:ring-blue-800 bg-white border-2">Upload Photo</button>
                        </Link>
                    </div>

                </div>

                <div className="text-xl flex justify-center m-6 h-96 items-center w-full">
                    <Image
                        src="/h.png"
                        width={400}
                        height={400}
                        className=''
                        alt="Description of image"
                    />
                </div>

            </div>
        </>
    )
}

export default HeaderPoster
