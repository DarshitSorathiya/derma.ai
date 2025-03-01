import Link from 'next/link'
import React from 'react'


function HospitalS() {
    return (
        <>
            <div className=' my-24 flex'>

                <div className='w-full gap-10'>
                    <Link href='/hospital'>
                        <div className='bg-[#116BA3] rounded-2xl py-64 mx-24 h-full'></div>
                    </Link>
                    <div className=' m-2 text-center mx-24 text-xl'>
                        Hospital Name
                    </div>
                    {/* <span className=' mx-24 text-lg text-gray-500'>
                        DOCTOR Name
                    </span> */}
                </div>

                <div className=' w-full gap-10' >
                    <Link href='/upload/hospital'>
                        <div className='bg-[#116BA3] rounded-2xl py-64 mx-24 h-full'></div>
                    </Link>
                    <div className=' m-2 text-center  mx-24 text-xl'>
                        Hospital Name
                    </div>
                    {/* <span className=' mx-24 text-lg text-gray-500'>
                        DOCTOR Name
                    </span> */}
                </div>

            </div>
        </>
    )
}

export default HospitalS