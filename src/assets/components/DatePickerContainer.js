import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, setMonth, setYear } from "date-fns";
import DateNavigation from "./ui/DateNavigation";
import DaysGrid from "./ui/DaysGrid";

const DatePickerContainer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleDateClick = (day) => {
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
    <div className="relative inline-block">
      <input
        type="text"
        ref={dateInputRef}
        readOnly
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="border border-gray-300 p-2 rounded-md cursor-pointer"
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
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerContainer;
