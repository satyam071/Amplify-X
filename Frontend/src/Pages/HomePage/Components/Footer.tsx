import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";



interface Props {

}

const Footer: React.FC<Props> = (props) => {
  return (
    <div className=" mt-10 flex w-full flex-col gap-8 border-t p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">

      {/* Icons */}
      <div className="flex gap-5">
        <button
          className="cursor-pointer text-2xl transition-all duration-300 hover:text-pink-500 sm:text-3xl"
        >
          <FaGithub />
        </button>

        <button
          className="cursor-pointer text-2xl transition-all duration-300 hover:text-pink-500 sm:text-3xl"
        >
          <SiGmail />
        </button>

        <button
          className="cursor-pointer text-2xl transition-all duration-300 hover:text-pink-500 sm:text-3xl"
        >
          <FaLinkedin />
        </button>
      </div>

      {/* Copyright Label */}
      <div className="flex flex-col md:items-end">
        <h1 className="text-left text-base sm:text-lg md:text-right">
          © Amplify-X
        </h1>

        <p className="text-left text-sm sm:text-base md:text-right">
          Your music. Your sound. Your platform.
        </p>
      </div>

    </div>
  );
};

export default Footer;