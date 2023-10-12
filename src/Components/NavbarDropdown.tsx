import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiUser, BiCaretDown } from "react-icons/bi";
import { User, useAuth } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import axiosClient from "../AxiosClient/axiosClient";
import Swal from "sweetalert2";

export default function Example() {
  const { setToken, user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setUser({} as User);
  };

  if (localStorage.getItem("token")) {
    axiosClient()
      .post("/auth/profile")
      .then((response) => {
        if (response.data.data.id !== user.id) {
          const data = response.data.data;
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => {
        Swal.fire(
          "Logged out!",
          "Your session have expired. Log in again!",
          "error"
        );
        handleLogout();
      });
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="align-middle">
        <Menu.Button
          className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-full bg-blue-900 
		ps-3 pe-2 py-1 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <BiUser />
          {user.firstName}
          <BiCaretDown />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div>
            <Menu.Item>
              <Link
                to="/profile"
                className="text-gray-900 block px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 hover:text-white"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/login"
                className="text-gray-900 block px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
