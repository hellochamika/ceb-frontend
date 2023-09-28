import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isNavOpened, setIsNavOpened] = useState(false);

  const handleNav = () => setIsNavOpened(!isNavOpened);

  return (
    <div>
      <div className="relative container mx-auto">
        <div className="flex items-center-justify-between p-6">
          <div className="flex items-center gap-2">
            <img
              className="w-10"
              src="../../public/ceb-logo.png"
              alt="ceb-logo"
            />
            <p className="hidden md:flex font-bold">Ceylon Electricity Board</p>
          </div>
          <div className="hidden md:flex space-x-6 items-center ms-auto">
            <a href="#" className="hover:text-yellow-700">
              Home
            </a>
            <a href="#" className="hover:text-yellow-700">
              Get My Bill
            </a>
            <a href="#" className="hover:text-yellow-700">
              Contact
            </a>
            <a href="#" className="hover:text-yellow-700">
              About
            </a>
            <a href="#" className="hover:text-yellow-700">
              Login
            </a>
            <a
              href="#"
              className="px-4 py-1 text-white bg-yellow-600 rounded-full hover:bg-yellow-700"
            >
              Register
            </a>
          </div>
          <div
            className="flex items-center ms-auto p-2 md:hidden"
            onClick={handleNav}
          >
            {isNavOpened ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </div>
        </div>

        <div
          className={
            isNavOpened
              ? "absolute w-full md:hidden flex flex-col py-2 gap-2 items-center bg-white ease-in-out duration-200"
              : "absolute w-full top-[-100%]"
          }
        >
          <a href="#" className="hover:text-yellow-700">
            Home
          </a>
          <a href="#" className="hover:text-yellow-700">
            Get My Bill
          </a>
          <a href="#" className="hover:text-yellow-700">
            Contact
          </a>
          <a href="#" className="hover:text-yellow-700">
            About
          </a>
          <a href="#" className="hover:text-yellow-700">
            Login
          </a>
          <a href="#" className="hover:text-yellow-700">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
