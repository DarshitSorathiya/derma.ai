import MedicineCard from '@/components/MedicineCard'
import React from 'react'


const medicinePage = () => {
    return (
        <>
        
                <div className=' text-3xl flex justify-center items-center m-8 font-bold'>
                    Medical Store
                </div>

                <div className="grid grid-cols-4 gap-4 mx-auto max-w-[1200px]">
                    {Array(8).fill(0).map((_, index) => (
                        <MedicineCard key={index} />
                    ))}
                </div>
                
        </>
    )
}

export default medicinePage
