import { useState } from "react";
import { LiaUserCircleSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import { ZodError, z } from "zod";
import axiosClient from "../axiosClient";

interface AccountDetails {
  accountNumber: number;
  name: string;
  lastReading: number;
  lastReadingDate: string;
}

function AddReading() {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountNumberError, setAccountNumberError] = useState<string>("");

  const [accountDetails, setAccountDetails] = useState<AccountDetails>();
  const [error, setError] = useState<string>("");

  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateError, setDateError] = useState<string>("");

  const [newReading, setNewReading] = useState<string>("");
  const [newReadingError, setNewReadingError] = useState<string>("");

  const zodSchema = z.number().min(10000001);

  const validateInputValue = () => {
    try {
      zodSchema.parse(parseInt(accountNumber));
      setError("");
    } catch (error) {
      setError("Invalid Account Number");
      return false;
    }

    return true;
  };

  const validateAccountNumber = (accountNumber: string) => {
    const accountNumberSchema = z
      .string()
      .regex(/^\d{8}$/, { message: "Account number must be 8 digit number" })
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 10000001, {
        message: "Account number must be 8 digits",
      })
      .refine((value) => value <= 99999999, {
        message: "Account number must be 8 digits",
      });

    try {
      setAccountNumberError("");
      if (!accountNumber) {
        return accountNumberSchema.parse(accountNumber);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setAccountNumberError(error.issues[0].message);
      }
      return;
    }
  };

  const validateDate = (selectedDate: Date, givenDate: Date) => {
    const selectedDateSchema = z.date();

    try {
      selectedDateSchema.parse(selectedDate);

      if (selectedDate < givenDate) {
        setDateError("New reading date must be after the last reading date");
        return false;
      } else {
        setDateError("");
      }
    } catch (error) {
      setDateError("Invalid Date");
      return false;
    }
    setDateError("");
    return true;
  };

  const validateReading = (newReading: string, givenReading: number) => {
    const selectedReadingSchema = z
      .number()
      .min(accountDetails?.lastReading || 0);
    try {
      selectedReadingSchema.parse(parseInt(newReading));
    } catch (error) {
      if (error instanceof ZodError && error.issues[0].code == "too_small") {
        setNewReadingError(
          "New reading must be greater than or equal the last reading"
        );
        return false;
      } else {
        setNewReadingError("Invalid Reading");
        return false;
      }
    }
    setNewReadingError("");
    return true;
  };

  async function getMeterReadings() {
    if (validateInputValue()) {
      axiosClient()
        .get(
          "http://localhost:3000/api/v1/readings/account/" +
            accountNumber +
            "/last"
        )
        .then((response) => {
          setAccountDetails(response.data.data);
          setNewReading(response.data.data.lastReading.toString());
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
  }

  async function addMeterReading(
    accountDetails: AccountDetails,
    date: string,
    newReading: number
  ) {
    if (
      !validateDate(new Date(date), new Date(accountDetails.lastReadingDate)) ||
      !validateReading(newReading.toString(), accountDetails.lastReading)
    ) {
      Swal.fire("Failed!", "Invalid data. Please check data again!", "error");

      return;
    }
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
        axiosClient()
          .post("/readings", {
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
                className={
                  accountNumberError
                    ? "border border-red-500 rounded-md w-sm p-2 m-2 text-center"
                    : "border border-gray-400 rounded-md w-sm p-2 m-2 text-center"
                }
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  validateAccountNumber(e.target.value);
                  setError("");

                  if (e.target.value.length == 0) {
                    setAccountDetails(undefined);
                  }
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
                    getMeterReadings();
                  }
                }}
              >
                Load User
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {accountNumberError && (
              <p className="text text-red-600 text-sm">{accountNumberError}</p>
            )}
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
                  <div className="flex flex-col items-center">
                    <input
                      type="date"
                      className={
                        dateError
                          ? "border border-red-600 rounded-md w-[268px] p-2 m-2 text-center"
                          : "border border-gray-400 rounded-md w-[268px] p-2 m-2 text-center"
                      }
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        validateDate(
                          new Date(e.target.value),
                          new Date(accountDetails.lastReadingDate)
                        );
                      }}
                    />
                    {dateError && (
                      <p className="text text-red-600 text-sm">{dateError}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-gray-800 font-bold">
                    Meter Reading
                  </label>
                  <input
                    type="number"
                    className={
                      newReadingError
                        ? "border border-red-600 rounded-md w-sm p-2 m-2 text-center"
                        : "border border-gray-400 rounded-md w-sm p-2 m-2 text-center"
                    }
                    value={newReading}
                    onChange={(e) => {
                      setNewReading(e.target.value);
                      validateReading(
                        e.target.value,
                        accountDetails.lastReading
                      );
                    }}
                  />
                  {newReadingError && (
                    <p className="text text-red-600 text-sm">
                      {newReadingError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="bg-yellow-500 my-3 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded-md"
                    onClick={() => {
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
