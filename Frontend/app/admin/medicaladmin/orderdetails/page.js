"use client"
import React, { useState } from 'react'

const orderdetailsPage = () => {
    const [order, setOrder] = useState(false); // default selection


    return (
        <>
            <div className=' text-3xl flex font-bold justify-center m-6'>
                <span className=' bg-white p-2 rounded-xl text-blue-600 '>Order Details :</span>
            </div>

            <div className=' bg-white gap-2 flex flex-col rounded-xl m-5'>

                <div className=' text-blue-600 text-2xl flex my-3 font-bold'>
                    <div className=' w-1/4 text-center'>Item Name</div>
                    <div className=' w-1/4 text-center'>Price</div>
                    <div className=' w-1/4 text-center'>Quantity</div>
                    <div className=' w-1/4 text-center'>Price</div>
                </div>

                {Array(8).fill(0).map((_, index) => (
                    <div className=' flex text-xl' key={index}>
                        <div className=' w-1/4 text-center'>Jenish</div>
                        <div className=' w-1/4 text-center'>56</div>
                        <div className=' w-1/4 text-center'>1/1000</div>
                        <div className=' w-1/4 text-center'>Price</div>
                    </div>
                ))}

                <div className=' flex text-xl'>
                    <div className=' w-1/4 text-center'></div>
                    <div className=' w-1/4 text-center'></div>
                    <div className=' w-1/4 text-center'></div>
                    <div className=' w-1/4 text-center text-blue-600 font-bold text-2xl'>Total = 10000</div>
                </div>

            </div>

            <div className=' bg-white flex rounded-xl m-5'>

                <div className='text-3xl text-blue-600  uppercase flex flex-none font-bold m-4'>Shipping Information :</div>

                <div className=' m-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ea fugit atque, porro maiores fuga et suscipit labore provident, repudiandae blanditiis ad quos voluptatibus iusto ut dignissimos rerum facere explicabo ipsam placeat sit veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sequi voluptatibus delectus? Ratione, sint aliquid, totam veritatis harum cupiditate laborum iure similique mollitia expedita velit ipsa voluptates dolore molestias nulla explicabo tempora, odit libero.
                </div>

            </div>

            {!order &&
                <div className='flex justify-center items-center gap-96'>
                    <div>
                        <button onClick={() => setOrder(true)} className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-4xl text-white'>Order Packed</button>
                    </div>
                    <div>
                        <button onClick={() => setOrder(true)} className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-4xl text-white'>Cancel Order</button>
                    </div>
                </div>
            }
            {order &&
                <>
                    <div className='w-full flex justify-center items-center'>
                        <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-4xl text-white'>Cancel Order</button>
                    </div>

                    <div className=' my-6 mx-10 justify-center gap-6 items-center flex '>
                        <div className='w-2/3'>
                            <input className=' p-4 bg-gray-100 w-full rounded-xl outline-none text-gray-700' type="text" placeholder='Enter traking ID' />
                        </div>

                        <div className='w-1/3 flex justify-center items-center'>
                            <button className=' bg-blue-400 hover:bg-blue-600 p-2 px-8 rounded-2xl text-4xl text-white'>Order Shipped</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default orderdetailsPage
