import React from "react";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slices/loginSlice";




const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Loggedout")
    console.log(user);
    console.log(isLoggedIn);
  }
  const handleNavigation = (section: "Home" | "Create-music" | "Listen-Music") => {
    navigate(section)

  }
  return (
    <>
      <div className="relative z-50">

        {/* Navbar */}
        <div className="flex w-full shrink-0 items-center justify-between bg-white/15 px-5 py-4 backdrop-blur-md md:px-8">

          {/* Logo */}
          <h1 className="font-bodoni text-[clamp(1rem,2vw,2rem)]">
            Amplify-X
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              onClick={() => {
                handleNavigation("Home")
              }}
              className="cursor-pointer text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500"
              href="#"
            >
              Home
            </a>

            <a
              onClick={() => {
                handleNavigation("Create-music")
              }}
              className="cursor-pointer text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500"
              href="#"
            >
              Create Release
            </a>

            <a
              onClick={() => {
                handleNavigation("Listen-Music")
              }}
              className="cursor-pointer text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500"
              href="#"
            >
              Listen Music
            </a>
          </div>

          {/* Desktop Sign Up */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaRegUserCircle className="text-2xl" />

                <p className="text-[clamp(1rem,2vw,1.5rem)]">
                  {user?.username}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-full border px-6 py-2 text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hidden cursor-pointer rounded-full border px-6 py-2 text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500 md:block"
            >
              Sign Up
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-2xl md:hidden"
          >
            <FaHamburger />
          </button>
        </div>


        {/* Mobile Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`
      fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
      transition-opacity duration-300
      ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
    `}
        />


        {/* Mobile Sliding Window */}
        <div
          className={`
      fixed right-0 top-0 z-50
      flex h-screen w-[80%] max-w-[350px]
      flex-col
      bg-black/90
      p-8
      backdrop-blur-xl
      transition-transform duration-500 ease-in-out
      ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
    `}
        >

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl transition-colors hover:text-pink-500"
            >
              ×
            </button>
          </div>


          {/* Mobile Links */}
          <div className="mt-16 flex flex-col gap-8">

            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl transition-colors duration-300 hover:text-pink-500"
            >
              Home
            </a>

            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl transition-colors duration-300 hover:text-pink-500"
            >
              Create Release
            </a>

            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl transition-colors duration-300 hover:text-pink-500"
            >
              Listen Music
            </a>

            {isLoggedIn ? (
              <div className=" items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaRegUserCircle className="text-2xl" />

                  <p className="text-[clamp(1rem,2vw,1.5rem)]">
                    {user?.username}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-full border px-6 py-2 text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className=" cursor-pointer rounded-full border px-6 py-2 text-[clamp(1rem,2vw,1.5rem)] transition-all duration-300 hover:text-pink-500 "
              >
                Sign Up
              </button>
            )}

          </div>
        </div>

      </div>

    </>
  );
};

export default NavBar;