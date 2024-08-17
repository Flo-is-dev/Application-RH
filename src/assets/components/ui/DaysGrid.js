import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";

const DaysGrid = ({
  currentDate,
  selectedDate,
  handleDateClick,
  disableFutureDates,
  disablePastDates,
}) => {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="grid grid-cols-7 gap-1">
      <div className="font-bold text-center">Sun</div>
      <div className="font-bold text-center">Mon</div>
      <div className="font-bold text-center">Tue</div>
      <div className="font-bold text-center">Wed</div>
      <div className="font-bold text-center">Thu</div>
      <div className="font-bold text-center">Fri</div>
      <div className="font-bold text-center">Sat</div>
      {days.map((day) => {
        const isDisabled =
          (disableFutureDates && isAfter(day, new Date())) ||
          (disablePastDates && isBefore(day, new Date()));
        return (
          <div
            key={day}
            onClick={() => !isDisabled && handleDateClick(day)}
            className={`p-2 text-center hover:bg-pink-200 rounded-xl  cursor-pointer ${
              isSameDay(day, selectedDate)
                ? "bg-pink-500 text-white "
                : isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            {format(day, "d")}
          </div>
        );
      })}
    </div>
  );
};

export default DaysGrid;
