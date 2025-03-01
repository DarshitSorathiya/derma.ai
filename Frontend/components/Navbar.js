"use client"; // Required for usePathname in Next.js 13+

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname(); // Get current route

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className=' bg-[#116BA3]  z-50  sticky top-0  text-white flex  justify-between  px-4  h-18  items-center flex-col  md:h-16 md:flex-row'>
      <div className=' h-20 w-full rounded-3xl text-2xl bg-blur-xl'>
        <div className='flex justify-between font-bold items-center h-full px-4'>

          <h1 className=' text-black p-8'>
            <Link href="/">
              <Image
                src="/7.png"
                alt="Logo"
                width={150}
                height={50}
                priority
              />
            </Link>
          </h1>

          <ul className="flex items-center gap-14 p-2 px-3 text-white">
            {/* Navigation Links */}
            <li>
              <ul className="flex gap-4 items-center">
                <li className="mr-4 p-2 px-3">
                  <Link
                    href="/"
                    className={`transition-colors duration-200 ${pathname === "/" ? "border-b-2 border-white " : ""
                      }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-4 p-2 px-3">
                  <Link
                    href="/about"
                    className={` transition-colors duration-200 ${pathname === "/about" ? "border-b-2 border-white " : ""
                      }`}
                  >
                    About
                  </Link>
                </li>
                {/* Dropdown Menu for Services */}
                <li className="mr-4 p-2 px-3">
                  <div className="relative inline-block text-left group">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center font-bold hover:text-white focus:outline-none"
                    >
                      Services
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                      </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 w-40 mt-1 bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                      <div className="py-1">
                        <Link href="/medicine" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
                          Medicine
                        </Link>
                        <Link href="/telemedicine" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
                          Telemedicine
                        </Link>
                        <Link href="/" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
                          Option 3
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mr-4 p-2 px-3">
                  <Link
                    href="/how"
                    className={` transition-colors duration-200 ${pathname === "/how" ? "border-b-2 border-white" : ""
                      }`}
                  >
                    How To Use?
                  </Link>
                </li>
              </ul>
            </li>

            {/* <li>
              <Link href="/login">
                <button className={`rounded-sm  p-1 px-2 bg-[#116BA3] text-white transition-colors duration-200 ${pathname === "/login" ? "bg-blue-700 shadow-md" : ""} ${pathname === "/register" ? "bg-blue-700 shadow-md" : ""} hover:bg-white hover:text-[#116BA3] hover:shadow-md` }>
                  Login
                </button>
              </Link>
            </li> */}

            {/* Avatar Button */}
            <li className="flex items-center">
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <img
                  id="avatarButton"
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src="/docs/images/people/profile-picture-5.jpg"
                  alt="User dropdown"
                />

                {isOpen && (
                  <div
                    id="userDropdown"
                    className="absolute z-10 right-0 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="avatarButton"
                    >
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex justify-between dark:hover:text-white">
                          <span>Wallet</span>
                          <span className=" text-green-400">00 coins</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>


        </div>
      </div>
    </nav>
  )
}

export default Navbar
