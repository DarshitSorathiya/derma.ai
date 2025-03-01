import Chatbot from "@/components/ChatBot";
import HeaderPoster from "@/components/HeaderPoster";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <HeaderPoster />

      {/* <Chatbot/> */}

      <div className=" h-fit">

        <div className=" text-5xl m-10 text-center font-bold">
          OUR VISION
        </div>

        <div className=" text-xl flex justify-center mx-14 px-16 text-center  m-4">
        We envision a world where AI-driven healthcare solutions are accessible to everyone, ensuring that skin disease detection is fast, affordable, and available from anywhere.
        </div>

      </div>

    </>
  );
}
