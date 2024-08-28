import React, { useState } from "react";
import { FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addMonths, subMonths } from "date-fns";
import SelectDropdown from "./SelectDropdown";

const DateNavigation = ({ currentDate, setCurrentDate, goToToday }) => {
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleMonthChange = (month) => {
    const updatedDate = new Date(currentDate.setMonth(month));
    setCurrentDate(updatedDate);
    setShowMonthSelect(false);
  };

  const handleYearChange = (year) => {
    const updatedDate = new Date(currentDate.setFullYear(year));
    setCurrentDate(updatedDate);
    setShowYearSelect(false);
  };

  //  ! On sort les options du mois et de l'année pour gagner en lisibilité
  const monthOption = Array.from({ length: 12 }, (_, index) => ({
    value: index,
    label: new Date(2024, index).toLocaleString("default", {
      month: "long",
    }),
  }));

  const yearOption = Array.from({ length: 60 }, (_, index) => {
    const year = 1964 + index;
    return { value: year, label: year };
  });

  return (
    <div className="flex items-center justify-between mb-4">
      <FaChevronLeft className="cursor-pointer" onClick={previousMonth} />
      <div className="flex space-x-2 items-center">
        <SelectDropdown
          label={currentDate.toLocaleString("default", { month: "long" })}
          options={monthOption}
          isOpen={showMonthSelect}
          toggleOpen={() => setShowMonthSelect(!showMonthSelect)}
          onSelect={handleMonthChange}
        />
        <SelectDropdown
          label={currentDate.getFullYear()}
          options={yearOption}
          isOpen={showYearSelect}
          toggleOpen={() => setShowYearSelect(!showYearSelect)}
          onSelect={handleYearChange}
        />
      </div>
      <FaChevronRight className="cursor-pointer" onClick={nextMonth} />
      <FaHome className="cursor-pointer ml-2" onClick={goToToday} />
    </div>
  );
};

export default DateNavigation;
