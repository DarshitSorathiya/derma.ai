import React from 'react'

const DAppointment = () => {
    return (
        <>
            <div className='flex text-xl items-center'>
                <div className=' text-center w-1/4'>Om</div>
                <div className=' text-center w-1/4'>20</div>
                <div className=' text-center w-1/4'>9:40 to 10:20</div>
                <div className=' text-center w-1/4'>
                    <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-xl text-white'>Call</button>
                </div>
            </div>
        </>
    )
}

export default DAppointment
