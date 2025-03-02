"use client"; // Required if using React hooks (e.g., useState)
import TimeSlotSelector from "@/components/TimeSlotSelector";
import Decrypted from "@/components/ui/Decrypted";
import { useState } from "react";


export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Handle form submission logic here
    };

    return (
        <>
            <div className=' text-3xl flex justify-center items-center font-bold m-4'>
                Appointment : Hospital Name
            </div>
            <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                    Book an Appointment
                </div>
                <form className="py-4 px-6" onSubmit={handleSubmit}>
                    {/** Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/** Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/** Phone Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/** Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/** Time */}
                    <div className="mb-4">
                       <TimeSlotSelector/>
                    </div>

                    {/** Service Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="service">
                            Service
                        </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a service</option>
                            <option value="haircut">Haircut</option>
                            <option value="coloring">Coloring</option>
                            <option value="styling">Styling</option>
                            <option value="facial">Facial</option>
                        </select>
                    </div>

                    {/** Message */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="message"
                            rows="4"
                            placeholder="Enter any additional information"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/** Submit Button */}
                    <div className="flex items-center justify-center mb-4">
                        <button
                            className="bg-gray-900 text-white py-2 px-4 rounded-lg relative overflow-hidden group hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                            type="submit"
                        >
                            <span className="absolute inset-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-20"></span>
                            Book Appointment
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
}




// import React from 'react'

// const appointmentPage = () => {
//     return (
//         <>
//             <div className=' text-3xl flex justify-center items-center font-bold m-4'>Appointment : Hospital Name</div>

//             <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//                     Book an Appointment
//                 </div>
//                 <form className="py-4 px-6" action="" method="POST">
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="name">
//                             Name
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="name" type="text" placeholder="Enter your name"/>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="email">
//                             Email
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="email" type="email" placeholder="Enter your email"/>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="phone">
//                             Phone Number
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="phone" type="tel" placeholder="Enter your phone number"/>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="date">
//                             Date
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="date" type="date" placeholder="Select a date"/>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="time">
//                             Time
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="time" type="time" placeholder="Select a time"/>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="service">
//                             Service
//                         </label>
//                         <select
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="service" name="service">
//                             <option value="">Select a service</option>
//                             <option value="haircut">Haircut</option>
//                             <option value="coloring">Coloring</option>
//                             <option value="styling">Styling</option>
//                             <option value="facial">Facial</option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2" for="message">
//                             Message
//                         </label>
//                         <textarea
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="message" rows="4" placeholder="Enter any additional information"></textarea>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                         <button
//                             className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
//                             type="submit">
//                             Book Appointment
//                         </button>
//                     </div>

//                 </form>
//             </div>
//         </>
//     )
// }

// export default appointmentPage
