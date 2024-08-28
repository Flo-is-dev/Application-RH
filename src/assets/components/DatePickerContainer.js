import React, { useState, useRef, useEffect } from "react";
import { format, isAfter, isBefore } from "date-fns";
import DateNavigation from "./datePickerComponents/DateNavigation";
import DaysGrid from "./datePickerComponents/DaysGrid";

const DatePickerContainer = ({
  disableFutureDates = false,
  disablePastDates = false,
  error,
  label,
  value,
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);

  // Effet pour mettre à jour selectedDate et l'input lorsque value change
  useEffect(() => {
    setSelectedDate(value); // Même si value est null ou "", selectedDate est mis à jour
    if (dateInputRef.current) {
      dateInputRef.current.value = value || ""; // Mettre à jour l'input avec la valeur ou une chaîne vide
    }
  }, [value]);

  const handleDateClick = (day) => {
    if (
      (disableFutureDates && isAfter(day, new Date())) ||
      (disablePastDates && isBefore(day, new Date()))
    ) {
      return;
    }
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    setShowDatePicker(false);
    if (dateInputRef.current) {
      dateInputRef.current.value = formattedDate;
    }
    if (onDateChange) {
      onDateChange(formattedDate);
    }
  };

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction pour aller à la date d'aujourd'hui
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    handleDateClick(today);
    setShowDatePicker(true);
  };

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
        className={`w-full px-4 py-1 border-b-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
          error ? "border-red-500 border" : "border-pink-500"
        }`}
        placeholder="Select a date"
      />
      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute mt-2 w-80 p-4 border border-gray-300 rounded-lg bg-white shadow-lg z-10"
        >
          <DateNavigation
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            goToToday={goToToday}
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
