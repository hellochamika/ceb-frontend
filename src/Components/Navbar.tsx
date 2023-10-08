import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

function Navbar() {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const { token, setToken } = useAuth();

  const handleNav = () => setIsNavOpened(!isNavOpened);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setToken("");
  };

  return (
    <div>
      <div className="relative container mx-auto">
        <div className="flex items-center justify-between p-6">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <img
                className="w-10"
                src="../../public/ceb-logo.png"
                alt="ceb-logo"
              />
              <p className="font-bold">
                <span className="hidden md:flex">Ceylon Electricity Board</span>
                <span className="flex md:hidden">CEB</span>
              </p>
            </div>
          </Link>
          <div className="hidden lg:flex space-x-6 items-center ms-auto">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            {token && (
              <Link to="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            )}
            <Link to="/viewbill" className="hover:text-blue-500">
              My Bill
            </Link>

            {!token && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 text-white bg-blue-400 rounded-full hover:bg-blue-300"
                >
                  Login
                </Link>
              </>
            )}

            {token && (
              <>
                <Link to="/addreading" className="hover:text-blue-500">
                  Add Reading
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-1 text-white bg-blue-400 rounded-full hover:bg-blue-300"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}
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
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          {token && (
            <Link to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
          )}
          <Link to="/viewbill" className="hover:text-blue-500">
            My Bill
          </Link>

          {!token && (
            <>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/addreading" className="hover:text-blue-500">
                Add Reading
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-500"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
