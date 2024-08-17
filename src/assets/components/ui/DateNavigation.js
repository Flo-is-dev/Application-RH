import React from "react";
import { FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MonthSelect from "./MonthSelect";
import YearSelect from "./YearSelect";

const DateNavigation = ({
  currentDate,
  previousMonth,
  nextMonth,
  goToToday,
  showMonthSelect,
  toggleMonthSelect,
  handleMonthChange,
  showYearSelect,
  toggleYearSelect,
  handleYearChange,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <FaChevronLeft className="cursor-pointer" onClick={previousMonth} />
      <div className="flex space-x-2 items-center">
        <MonthSelect
          currentDate={currentDate}
          handleMonthChange={handleMonthChange}
          showMonthSelect={showMonthSelect}
          toggleMonthSelect={toggleMonthSelect}
        />
        <YearSelect
          currentDate={currentDate}
          handleYearChange={handleYearChange}
          showYearSelect={showYearSelect}
          toggleYearSelect={toggleYearSelect}
        />
      </div>
      <FaChevronRight className="cursor-pointer ml-2" onClick={nextMonth} />
      <FaHome className="cursor-pointer ml-2" onClick={goToToday} />
    </div>
  );
};

export default DateNavigation;
