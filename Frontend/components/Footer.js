import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";


function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <>
            <footer className="bg-[#116BA3] text-white rounded-sm p-12 pb-0 ">
                <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 text-sm">

                    {/* Logo & Social Media */}
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-1">
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
                        {/* Social Media Icons */}
                        <div className="flex gap-4 mt-4 text-lg">
                            <Link href="#"><FaFacebookF /></Link>
                            <Link href="#"><FaTwitter /></Link>
                            <Link href="#"><FaInstagram /></Link>
                            <Link href="#"><FaLinkedinIn /></Link>
                            <Link href="#"><FaYoutube /></Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-bold text-xl  mb-3">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Features</Link></li>
                            <li><Link href="#" className="hover:underline">Pricing</Link></li>
                            <li><Link href="#" className="hover:underline">Case studies</Link></li>
                            <li><Link href="#" className="hover:underline">Reviews</Link></li>
                            <li><Link href="#" className="hover:underline">Updates</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-xl  mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">About</Link></li>
                            <li><Link href="#" className="hover:underline">Contact us</Link></li>
                            <li><Link href="#" className="hover:underline">Careers</Link></li>
                            <li><Link href="#" className="hover:underline">Culture</Link></li>
                            <li><Link href="#" className="hover:underline">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-xl  mb-3">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Getting started</Link></li>
                            <li><Link href="#" className="hover:underline">Help center</Link></li>
                            <li><Link href="#" className="hover:underline">Server status</Link></li>
                            <li><Link href="#" className="hover:underline">Report Link bug</Link></li>
                            <li><Link href="#" className="hover:underline">Chat support</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-xl mb-3">Contacts us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <MdEmail className="" /> <Link href="mailto:contact@company.com" className="hover:underline">contact@company.com</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <MdPhone className="" /> <Link href="tel:(414)687-5892" className="hover:underline">(414) 687 - 5892</Link>
                            </li>
                            <li className="flex items-start gap-2">
                                <MdLocationOn className=" mt-1" />
                                <span>794 Mcallister St <br /> San Francisco, 94102</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-700 m-3 mt-16 rounded-xl h-1 opacity-15"></div>

                <div className=' flex  justify-center  px-4 m-6 my-3 items-center'>
                    <p>COPYRIGHT &copy; {currentYear} derma.ai - All right reserved</p>
                </div>

            </footer>
        </>
    )
}

export default Footer