import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Dashboard
        </h1>

        <div>
          <div className="flex flex-col items-center">
            <Link to="/viewbill" className="hover:text-blue-500">
              My Bill
            </Link>
            <Link to="/addreading" className="hover:text-blue-500">
              Add Reading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
