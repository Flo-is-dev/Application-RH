import React, { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  setMonth,
} from "date-fns";
import { FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DateInput = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false); // État pour contrôler le menu déroulant du mois
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);
  const monthSelectRef = useRef(null); // Référence pour le menu des mois
  const monthButtonRef = useRef(null); // Référence pour l'élément du mois

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
    setShowDatePicker(false);

    if (dateInputRef.current) {
      dateInputRef.current.value = format(today, "yyyy-MM-dd");
    }
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleMonthChange = (month) => {
    const updatedDate = setMonth(currentDate, month);
    setCurrentDate(updatedDate);
    setShowMonthSelect(false); // Ferme le menu déroulant après sélection
  };

  const renderDays = () => {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const startWeek = startOfWeek(startMonth);
    const endWeek = endOfWeek(endMonth);

    const days = eachDayOfInterval({ start: startWeek, end: endWeek });

    return days.map((day) => (
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        className={`p-2 text-center border border-gray-200 cursor-pointer ${
          isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : ""
        }`}
      >
        {format(day, "d")}
      </div>
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        monthSelectRef.current &&
        !monthSelectRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowMonthSelect(false); // Ferme le menu si clic à l'extérieur
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMonthSelect = () => (
    <div
      ref={monthSelectRef}
      className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
      style={{ width: "139px" }}
    >
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          onClick={() => handleMonthChange(index)}
          className={`p-2 cursor-pointer hover:bg-gray-200 ${
            currentDate.getMonth() === index ? "bg-blue-500 text-white" : ""
          }`}
        >
          {format(new Date(2024, index), "MMMM")}
        </div>
      ))}
    </div>
  );

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
          <div className="flex justify-between items-center mb-4 relative">
            <FaChevronLeft className="cursor-pointer" onClick={previousMonth} />
            <div
              className="font-bold text-lg cursor-pointer relative"
              style={{ minWidth: "140px", textAlign: "center" }}
              onClick={() => setShowMonthSelect(!showMonthSelect)}
              ref={monthButtonRef}
            >
              {format(currentDate, "MMMM yyyy")}
              {showMonthSelect && renderMonthSelect()}
            </div>
            <FaChevronRight className="cursor-pointer" onClick={nextMonth} />
            <FaHome className="cursor-pointer ml-2" onClick={goToToday} />
          </div>
          <div className="grid grid-cols-7 gap-1">
            <div className="font-bold text-center">Sun</div>
            <div className="font-bold text-center">Mon</div>
            <div className="font-bold text-center">Tue</div>
            <div className="font-bold text-center">Wed</div>
            <div className="font-bold text-center">Thu</div>
            <div className="font-bold text-center">Fri</div>
            <div className="font-bold text-center">Sat</div>
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
