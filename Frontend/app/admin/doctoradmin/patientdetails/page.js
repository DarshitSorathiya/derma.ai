"use client"
import { useState } from 'react';

const PatientDetailsPage = () => {
    const [medicines, setMedicines] = useState([]);
    const [medicineName, setMedicineName] = useState('');
    const [quantity, setQuantity] = useState('');

    const addMedicine = () => {
        if (medicineName && quantity) {
            setMedicines([...medicines, { name: medicineName, qty: quantity }]);
            setMedicineName('');
            setQuantity('');
        }
    };

    const removeMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className=''>

                <div className='text-4xl flex font-bold justify-center m-6'>
                    <span className='p-2 rounded-xl text-blue-600'>Patient Details</span>
                </div>

                <div className='flex items-center justify-center'>
                    <div className='text-xl w-1/3 flex flex-col p-4 rounded-2xl bg-white'>
                        <div><span>Patient Name: </span><span>Om Patel</span></div>
                        <div><span>Age: </span><span>20</span></div>
                        <div className=' '>
                            <span>Diagnosed Disease: </span><span>Skin Infection</span>
                            <textarea
                                className="shadow my-2 border rounded w-full bg-blue-100 py-2 px-3 text-gray-700 focus:outline-none"
                                rows="4" placeholder="Enter Description">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className='bg-white m-3 flex flex-col   gap-4 rounded-xl text-xl p-3'>
                    <div className=' flex m-4 gap-3 mx-44'>

                        <div className='text-3xl font-bold flex-none text-blue-600'>Add Medicine : </div>
                        <div className='flex gap-4'>
                            <input
                                type='text'
                                placeholder='Medicine Name'
                                value={medicineName}
                                onChange={(e) => setMedicineName(e.target.value)}
                                className='border rounded px-8 pr-56  p-2 w-full'
                            />
                            <input
                                type='number'
                                placeholder='Quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className='border rounded p-2 w-1/3'
                            />
                            <button onClick={addMedicine} className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded'>
                                Add
                            </button>
                        </div>
                    </div>


                    <div className='flex text-2xl'>
                        <div className='w-1/3 text-center text-blue-600 font-semibold'>Medicine Name</div>
                        <div className='w-1/3 text-center text-blue-600 font-semibold'>Quantity</div>
                        <div className='w-1/3 text-center text-blue-600 font-semibold'>Delete</div>
                    </div>

                    {medicines.map((med, index) => (
                        < div key={index}>
                            <div key={index} className='flex text-xl'>
                                <div className='text-center w-1/3'>{med.name}</div>
                                <div className='text-center w-1/3'>{med.qty}</div>
                                <div className='text-center w-1/3'>
                                    <button onClick={() => removeMedicine(index)} className='bg-red-400 hover:bg-red-600 p-2 px-8 rounded-2xl text-white'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex'>
                        <div className='text-center w-1/3'></div>
                        <div className='text-center w-1/3'></div>
                        <div className='text-center w-1/3'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDetailsPage;
