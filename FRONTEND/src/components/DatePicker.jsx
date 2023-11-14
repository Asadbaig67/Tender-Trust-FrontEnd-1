import React, { useState, useRef, useEffect } from "react";

import "alpinejs";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DatePicker() {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [no_of_days, setNoOfDays] = useState([]);
  const [blankdays, setBlankdays] = useState([]);

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setDatepickerValue(new Date(year, month, today.getDate()).toDateString());
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getDateValue = (date) => {
    let selectedDate = new Date(year, month, date);
    setDatepickerValue(selectedDate.toDateString());

    // You can use the selected date as needed, for example, save it in state.
    // For this example, I'm just logging it.
    console.log(selectedDate.toISOString());

    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1);
    let dayOfWeek = firstDayOfMonth.getDay();

    // Calculate the number of blank days from the previous month
    let lastMonthDays = new Date(year, month, 0).getDate();
    let blankdaysArray = Array.from(
      { length: dayOfWeek === 0 ? 6 : dayOfWeek - 1 },
      (_, i) => lastMonthDays - i
    );

    let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankdays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const toggleDatepicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  const incrementMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    getNoOfDays();
  };

  const decrementMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    getNoOfDays();
  };

  // Initialize on mount
  React.useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);

  return (
    <div className="border-solid ">
      <div className="antialiased sans-serif">
        <div>
          <div className="">
            <div className="mb-5 w-75">
              {/* <label
                htmlFor="datepicker"
                className="font-bold mb-1 text-gray-700 block"
              >
                Select Date
              </label> */}
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={datepickerValue}
                  onClick={toggleDatepicker}
                  className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Select date"
                />

                <div className="absolute top-0 right-0 px-3 py-2">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                {showDatepicker && (
                  <div
                    className="bg-white z-10 mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
                    style={{ width: "17rem" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          {MONTH_NAMES[month]}
                        </span>
                        <span className="ml-1 text-lg text-gray-600 font-normal">
                          {year}
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          disabled={month === 0}
                          onClick={decrementMonth}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          disabled={month === 11}
                          onClick={incrementMonth}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-3 -mx-1">
                      {DAYS.map((day, index) => (
                        <div
                          key={index}
                          style={{ width: "14.26%" }}
                          className="px-1"
                        >
                          <div className="text-gray-800 font-medium text-center text-xs">
                            {day}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap -mx-1">
                      {blankdays.map((blankday, index) => (
                        <div
                          key={index}
                          style={{ width: "14.28%" }}
                          className="text-center border p-1 border-transparent text-sm"
                        >_</div>
                      ))}
                      {no_of_days.map((date, dateIndex) => (
                        <div
                          key={dateIndex}
                          style={{ width: "14.28%" }}
                          className="px-1 mb-1"
                        >
                          <div
                            onClick={() => getDateValue(date)}
                            className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                              isToday(date)
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-blue-200"
                            }`}
                          >
                            {date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
