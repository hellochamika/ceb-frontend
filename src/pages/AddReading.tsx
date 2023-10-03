import { LiaUserCircleSolid } from "react-icons/lia";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

interface AccountDetails {
  accountNumber: number;
  name: string;
  lastReading: number;
  lastReadingDate: string;
}

function AddReading() {
  const [accountNumber, setAccountNumber] = useState<string>("");

  const [accountDetails, setAccountDetails] = useState<AccountDetails>();
  const [error, setError] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [newReading, setNewReading] = useState<string>("");

  async function getMeterReadings(accountNumber: string) {
    const response = await axios
      .get(
        "http://localhost:3000/api/v1/readings/account/" +
          accountNumber +
          "/last"
      )
      .then((response) => {
        setAccountDetails(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  async function addMeterReading(
    accountDetails: AccountDetails,
    date: string,
    newReading: number
  ) {
    var str =
      "Account Number  : " +
      accountDetails.accountNumber.toString().padEnd(10, " ") +
      "\n" +
      "Date            : " +
      date.toString().padEnd(10, " ") +
      "\n" +
      "Reading         : " +
      newReading.toString().padEnd(10, " ");

    Swal.fire({
      title: "Are you sure?",
      html: "<pre>" + str + "</pre>",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:3000/api/v1/readings", {
            accountNumber: accountDetails.accountNumber,
            readingDate: date,
            meterReading: newReading,
          })
          .then((response) => {
            Swal.fire("Added!", "New meter reading has been added.", "success");
            setAccountDetails(undefined);
            setAccountNumber("");
            setDate("");
            setNewReading("");
          })
          .catch((error) => {
            Swal.fire("Failed!", "An error occured. Please retry!", "error");
            console.log(error);
          });
      }
    });
  }

  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Add Reading
        </h1>

        <div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center">
              <input
                type="text"
                name="accountNumber"
                className="border border-gray-400 rounded-md w-sm p-2 m-2 text-center"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded-md"
                onClick={(e) => {
                  setAccountDetails(undefined);
                  e.preventDefault();
                  if (accountNumber) {
                    getMeterReadings(accountNumber);
                  }
                }}
              >
                Load User
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center md:flex-row md:gap-3 my-3 p-3 md:px-10 border border-red-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
            <p className="text-red-600 text-2xl font-bold">{error}</p>
          </div>
        )}

        {accountDetails && (
          <>
            <div className="flex flex-col items-center justify-center md:flex-row md:gap-3 my-3 p-3 md:px-10 border border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
              <div>
                <LiaUserCircleSolid size={130} />
              </div>

              <div className="flex flex-col gap-2 align-middle justify-center items-center md:items-start">
                <p className="text-gray-800 text-2xl font-bold">
                  {accountDetails.name}
                </p>
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-gray-800 font-bold">
                    Account Number: {accountDetails.accountNumber}
                  </p>
                  <p className="text-gray-800 font-bold">Last meter reading:</p>
                  <div className="flex flex-col md:flex-row gap-x-4 text-center md:text-left">
                    <p className="text-gray-800">
                      Date:{" "}
                      {accountDetails.lastReadingDate
                        ? accountDetails.lastReadingDate.substring(0, 10)
                        : "N/A"}
                    </p>
                    <p className="text-gray-800">
                      Reading:{" "}
                      {accountDetails.lastReading
                        ? accountDetails.lastReading
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 my-2 p-1 md:px-10 border border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
              <h1 className="text-2xl font-bold text-center text-gray-800 pt-2">
                New Reading
              </h1>
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center w-full">
                  <label className="text-gray-800 font-bold">
                    Reading Date
                  </label>
                  <div className="flex flex-row">
                    <input
                      type="date"
                      className="border border-gray-400 rounded-md w-[268px] p-2 m-2 text-center"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-gray-800 font-bold">
                    Meter Reading
                  </label>
                  <input
                    type="number"
                    className="border border-gray-400 rounded-md w-sm p-2 m-2 text-center"
                    value={newReading}
                    onChange={(e) => {
                      setNewReading(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="bg-yellow-500 my-3 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      addMeterReading(
                        accountDetails,
                        date,
                        parseInt(newReading)
                      );
                    }}
                  >
                    Add Reading
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddReading;
