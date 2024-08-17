import { useState, useRef, useEffect } from "react";
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
  const [showMonthSelect, setShowMonthSelect] = useState(false);
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

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    const updatedDate = setMonth(currentDate, newMonth);
    setCurrentDate(updatedDate);
    setShowMonthSelect(false);
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
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowMonthSelect(false);
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
          <div className="flex justify-between items-center mb-4">
            <FaChevronLeft className="cursor-pointer" onClick={previousMonth} />
            {showMonthSelect ? (
              <select
                value={currentDate.getMonth()}
                onChange={handleMonthChange}
                className="bg-white border border-gray-300 rounded-md"
                onBlur={() => setShowMonthSelect(false)}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index} value={index}>
                    {format(new Date(2024, index), "MMMM")}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className="font-bold text-lg cursor-pointer"
                onClick={() => setShowMonthSelect(true)}
              >
                {format(currentDate, "MMMM yyyy")}
              </div>
            )}
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
