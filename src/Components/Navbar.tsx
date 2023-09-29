import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isNavOpened, setIsNavOpened] = useState(false);

  const handleNav = () => setIsNavOpened(!isNavOpened);

  return (
    <div>
      <div className="relative container mx-auto">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <img
              className="w-10"
              src="../../public/ceb-logo.png"
              alt="ceb-logo"
            />
            <p className="font-bold"><span className="hidden md:flex">Ceylon Electricity Board</span>
			<span className="flex md:hidden">CEB</span></p>
          </div>
          <div className="hidden lg:flex space-x-6 items-center ms-auto">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
            <a href="#" className="hover:text-blue-500">
              Get My Bill
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
            <a href="#" className="hover:text-blue-500">
              Login
            </a>
            <a
              href="#"
              className="px-4 py-1 text-white bg-blue-400 rounded-full hover:bg-blue-300"
            >
              Register
            </a>
          </div>
          <div
            className="flex items-center ms-auto p-2 lg:hidden"
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
              ? "absolute w-full lg:hidden flex flex-col py-2 gap-2 items-center bg-white ease-in-out duration-200"
              : "absolute w-full top-[-100%]"
          }
        >
          <a href="#" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            Get My Bill
          </a>
          <a href="#" className="hover:text-blue-500">
            Contact
          </a>
          <a href="#" className="hover:text-blue-500">
            About
          </a>
          <a href="#" className="hover:text-blue-500">
            Login
          </a>
          <a href="#" className="hover:text-blue-500">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
