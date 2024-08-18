import React, { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  isAfter,
  isBefore,
} from "date-fns";
import DateNavigation from "./ui/DateNavigation";
import DaysGrid from "./ui/DaysGrid";

const DatePickerContainer = ({
  disableFutureDates = false,
  disablePastDates = false,
  error,
  label,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleDateClick = (day) => {
    if (
      (disableFutureDates && isAfter(day, new Date())) ||
      (disablePastDates && isBefore(day, new Date()))
    ) {
      return;
    }
    setSelectedDate(day);
    setShowDatePicker(false);
    if (dateInputRef.current) {
      dateInputRef.current.value = format(day, "yyyy-MM-dd");
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setShowDatePicker(true);
    if (dateInputRef.current) {
      dateInputRef.current.value = format(today, "yyyy-MM-dd");
    }
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleMonthChange = (month) => {
    setCurrentDate(setMonth(currentDate, month));
    setShowMonthSelect(false);
    setShowYearSelect(false);
  };

  const handleYearChange = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setShowYearSelect(false);
    setShowMonthSelect(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowMonthSelect(false);
        setShowYearSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative block">
      <label className="block text-sm mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        ref={dateInputRef}
        readOnly
        onClick={() => setShowDatePicker(!showDatePicker)}
        className={`w-full px-4 py-1 border-b-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-pink-500 ${
          error ? "border-red-500 border" : "border-pink-500 "
        } rounded-md`}
        placeholder="Select a date"
      />
      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute mt-2 w-80 p-4 border border-gray-300 rounded-lg bg-white shadow-lg z-10"
        >
          <DateNavigation
            currentDate={currentDate}
            previousMonth={previousMonth}
            nextMonth={nextMonth}
            goToToday={goToToday}
            showMonthSelect={showMonthSelect}
            toggleMonthSelect={() => {
              setShowMonthSelect(!showMonthSelect);
              setShowYearSelect(false);
            }}
            handleMonthChange={handleMonthChange}
            showYearSelect={showYearSelect}
            toggleYearSelect={() => {
              setShowYearSelect(!showYearSelect);
              setShowMonthSelect(false);
            }}
            handleYearChange={handleYearChange}
          />
          <DaysGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            handleDateClick={handleDateClick}
            disableFutureDates={disableFutureDates}
            disablePastDates={disablePastDates}
          />
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DatePickerContainer;
