import TeleCard from '@/components/TeleCard'
import React from 'react'


const telemedicinePage = () => {
    return (
        <>
            <div className='text-3xl flex justify-center items-center m-8 font-bold'>
                Telimedicine
            </div>

            <div className="  ">
                {Array(8).fill(0).map((_, index) => (
                    <TeleCard key={index} />
                ))}
            </div>

        </>
    )
}

export default telemedicinePage
