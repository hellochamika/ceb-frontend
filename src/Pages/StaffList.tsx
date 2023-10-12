import { useEffect, useState } from "react";
import axiosClient from "../AxiosClient/axiosClient";
import Swal from "sweetalert2";

type Staff = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isApproved: boolean;
  isAdmin: boolean;
};

function StaffList() {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  async function getStaffList() {
    try {
      const response = await axiosClient().get("/staff");
      setStaffList(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  }

  async function toggleApprove(
    id: number,
    isApproved: boolean
  ): Promise<boolean> {
    try {
      const result = await axiosClient().put("/staff/" + id + "/approve", {
        isApproved: isApproved,
      });

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated Successfully",
        });
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return false;
    }
  }

  useEffect(() => {
    getStaffList();
  }, []);

  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Staff
        </h1>

        <div className="flex items-center sm:justify-center my-3 px-3 py-8 md:px-10 border bg-white border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px] overflow-x-scroll">
          <table className="table-auto sm:w-3/4 mb-5">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">First Name</th>
                <th className="border border-gray-300 p-2">Last Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Is Approved</th>
              </tr>
            </thead>
            <tbody>
              {staffList
                .filter((staff) => staff.id !== 1)
                .map((staff) => (
                  <tr key={staff.id}>
                    <td className="border border-gray-300 p-2">
                      {staff.firstName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {staff.lastName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {staff.email}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <div className="flex flex-col items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={staff.isApproved}
                            onChange={async (e) => {
                              if (
                                await toggleApprove(staff.id, e.target.checked)
                              ) {
                                staff.isApproved = e.target.checked;
                                getStaffList();
                              }
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffList;
