"use client"
// import React, { useState } from 'react'


// const Uploadform = () => {

//   const [files, setFiles] = useState([]);
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFile = (event) => {
//     const file = event.target.files[0];
//     setFileName(file ? file.name : "");
//   };

//   return (
//     <>
//       <div>
//         <h1 className=' text-2xl p-10 flex justify-center items-center font-bold'>Upload Page</h1>
//         <form className=' flex gap-4 justify-center items-center '>
//           <label className="block text-2xl font-medium text-gray-700">

//             <input
//               type="file"
//               name="file"
//               onChange={handleFile}
//               className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xl file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
//             />

//           </label>

//           <input
//             type="submit"
//             value="Upload"
//             className="mt-2 px-6 py-2 bg-slate-100 text-black rounded-lg font-semibold text-lg hover:bg-slate-200 transition duration-300 cursor-pointer shadow-md"
//           />

//         </form>

//       </div>

//     </>
//   )
// }

// export default Uploadform
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4">

        <div>
          <h1 className=' text-2xl p-10 flex justify-center items-center font-bold'>Upload Page</h1>
        </div>

        {/* File Input Button */}
        <label className="relative cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>

        {/* Display File Name */}
        {file && <p className="text-gray-600 text-sm">{file.name}</p>}

      </div>

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
          <span className="">Text</span>
          <p className="line"></p>
          <span className="">Text</span>
          <p className="line"></p>
          <span className="">Text</span>
          <p className="line"></p>
          <span className="">Text</span>

        </div>
      </div>
    </>
  );
}
