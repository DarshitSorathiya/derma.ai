'use client'

import HospitalS from '@/components/HospitalS';
import Decrypted from '@/components/ui/Decrypted';
import Uploadform from '@/components/Uploadform';
import Link from 'next/link';
import React, { useState } from 'react'


const uploadPage = () => {
    const [files, setFiles] = useState([]);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploaded, setUploaded] = useState(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            setUploaded(true); // Show the section after file upload
        }
    };

    return (
        <>
            <div className="flex flex-col items-center space-y-4">

                <div>
                    <h1 className=' text-6xl p-10 flex justify-center items-center font-bold'>
                        Upload Image
                    </h1>
                </div>

                {/* File Input Button */}
                <label className="relative cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold text-xl hover:bg-blue-600">
                    Choose File
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </label>

                {/* Display File Name */}
                {/* {file && <p className="text-gray-600 text-sm">{file.name}</p>} */}

            </div>

            {uploaded && (
                <>
                    <div className=" flex m-10"  >

                        <div className=" w-full flex justify-center items-center">
                            {/* Image Preview */}
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2  max-w-96 max-h-96 object-cover rounded-lg shadow-md"
                                />
                            )}
                        </div>

                        <div className="w-full p-3 text-xl flex flex-col justify-center max-h-96 gap-2 bg-white rounded-xl">

                            <span className=" gap-2 flex">
                                <p className="font-bold">Name:</p>
                                {file && <p className="text-gray-600 ">{file.name}</p>}
                            </span>
                            <p className="line"></p>
                            <span className="">Decieased Name: </span>
                            <p className="line"></p>
                            <span className="">Text</span>
                            <p className="line"></p>
                            <span className="">Text</span>
                            <p className="line"></p>
                            <span className="">Text</span>

                        </div>
                    </div>

                    <HospitalS />
                    <HospitalS />
                    <HospitalS />
                </>
            )
            }
        </>
    )
}

export default uploadPage
