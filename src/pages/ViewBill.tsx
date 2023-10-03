import { LiaUserCircleSolid } from "react-icons/lia";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface BillDetails {
  name: string;
  accountNumber: number;

  currentMeterReading: number;
  currentMeterReadingDate: Date;

  previousMeterReading: number;
  previousMeterReadingDate: Date;

  firstRangeCharge: number;
  secondRangeCharge: number;
  thirdRangeCharge: number;

  fixedCharge: number;
  totalCharge: number;
}

function ViewBill() {
  const [accountNumber, setAccountNumber] = useState<string>("");

  const [billDetails, setBillDetails] = useState<BillDetails>();
  const [error, setError] = useState<string>("");

  async function getBillData(accountNumber: string) {
    if (accountNumber) {
      await axios
        .get(
          "http://localhost:3000/api/v1/customers/account/" +
            accountNumber +
            "/bill"
        )
        .then((response) => {
          setBillDetails(response.data.data);
        })
        .catch((error) => {
          if (error.response.status == 406) {
            setError("Invalid Account Number");
          } else {
            setError(error.message);
            console.log(error);
          }
        });
    }
  }

  useEffect(() => {
    if (billDetails && !billDetails.previousMeterReading) {
      setError("No adaquate data to generate bill");
    }
  }, [billDetails]);

  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          View My Bill
        </h1>

        <div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center">
              <input
                type="text"
                name="accountNumber"
                className="border border-gray-400 rounded-md p-2 m-2 text-center"
                placeholder="Enter Account Number"
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setBillDetails(undefined);
                  setError("");
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded-md"
                onClick={(e) => {
                  getBillData(accountNumber);
                }}
              >
                Get Bill
              </button>
            </div>
          </div>
        </div>

        <>
          {billDetails && (
            <>
              <div className="flex flex-col items-center justify-center md:flex-row md:gap-3 my-3 p-3 md:px-10 border border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
                <div>
                  <LiaUserCircleSolid size={130} />
                </div>

                <div className="flex flex-col align-middle justify-center items-center md:items-start">
                  <p className="text-gray-800 pb-1 text-2xl font-bold">
                    {billDetails.name}
                  </p>
                  <p className="text-gray-800 font-bold">Account Number:</p>
                  <p className="text-gray-800 font-bold">
                    {billDetails.accountNumber}
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-3 w-3/4 items-center mb-3 border border-gray-300 rounded-md md:flex-row md:justify-center md:w-[640px]">
                <div className="grow p-1 md:ms-4">
                  <h1 className="font-bold pb-1">Previous Reading</h1>
                  <table>
                    <tbody>
                      <tr>
                        <td>Reading</td>
                        <td>
                          :{" "}
                          {billDetails.previousMeterReading
                            ? billDetails.previousMeterReading
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>
                          :{" "}
                          {billDetails.previousMeterReadingDate
                            ? billDetails.previousMeterReadingDate.toString()
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grow p-1 md:ms-4">
                  <h1 className="font-bold pb-1">Current Reading</h1>
                  <table>
                    <tbody>
                      <tr>
                        <td>Reading</td>
                        <td>
                          :{" "}
                          {billDetails.currentMeterReading
                            ? billDetails.currentMeterReading
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>
                          :{" "}
                          {billDetails.currentMeterReadingDate
                            ? billDetails.currentMeterReadingDate.toString()
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="p-3 mb-3 md:px-10 border border-red-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">
              <p className="text-center text-red-600 text-xl font-bold">
                {error}
              </p>
            </div>
          )}

          {billDetails && billDetails.totalCharge && (
            <div className="flex flex-col p-3 w-3/4 mb-3 items-center border border-gray-300 rounded-md md:w-[640px]">
              <h1 className="font-bold p-3">Bill Details</h1>
              <table className="table-auto w-full sm:w-3/4">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      From
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      {billDetails.previousMeterReadingDate.toString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      To
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      {billDetails.currentMeterReadingDate.toString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      Total Units
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      not sent from backend
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      First Range Charge
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      Rs. {billDetails.firstRangeCharge}/-
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      Second Range Charge
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      Rs. {billDetails.secondRangeCharge}/-
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      Third Range Charge
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      Rs. {billDetails.thirdRangeCharge}/-
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-1 md:px-4 py-2">
                      Fixed Charge
                    </td>
                    <td className="border border-gray-300 px-1 md:px-4 py-2 text-right">
                      Rs. {billDetails.fixedCharge}/-
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-gray-200 border border-gray-300 px-1 md:px-4 py-2">
                      Total
                    </td>
                    <td className="bg-gray-200 border border-gray-300 px-1 md:px-4 py-2 text-right">
                      Rs. {billDetails.totalCharge}/-
                    </td>
                  </tr>{" "}
                </tbody>
              </table>
            </div>
          )}

          {billDetails && (
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded-md"
              onClick={(e) => {
                setBillDetails(undefined);
                setError("");
              }}
            >
              Reset
            </button>
          )}
        </>
      </div>
    </div>
  );
}

export default ViewBill;
