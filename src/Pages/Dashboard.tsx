import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Dashboard
        </h1>

        <div className="flex flex-col items-center justify-center bg-white md:flex-row md:gap-3 mt-3 p-3 md:px-10 border border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
          <p className="text-gray-900 text-center text-2xl font-bold">
            Welcome {user.firstName}!
          </p>
        </div>

			
          <div className="flex flex-col items-center justify-center bg-white md:gap-3 my-3 p-3 md:px-10 border border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
            <Link to="/viewbill" className="hover:text-blue-500">
              My Bill
            </Link>

            <>
              {user.isApproved ? (
                <Link to="/addreading" className="hover:text-blue-500">
                  Add Reading
                </Link>
              ) : (
                <></>
              )}

              {user.isAdmin ? (
                <Link to="/staff" className="hover:text-blue-500">
                  Manage Staff
                </Link>
              ) : (
                <></>
              )}
            </>
          </div>
        {!user.isApproved ? (
          <div className="flex flex-col items-center justify-center md:flex-row p-3 px-10 border border-red-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
            <p className="text-red-600 text-center text-2xl font-bold">
              You cannot add meter reading until your account is approved!
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
