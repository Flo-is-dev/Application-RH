import { format } from "date-fns";
import { FaChevronDown } from "react-icons/fa";

const YearSelect = ({
  currentDate,
  handleYearChange,
  showYearSelect,
  toggleYearSelect,
}) => {
  return (
    <div className="relative">
      <div
        className="font-semibold text-base cursor-pointer  flex justify-center"
        style={{ textAlign: "center" }}
        onClick={toggleYearSelect}
      >
        {format(currentDate, "yyyy")}
        <FaChevronDown className="cursor-pointer text-xs mt-2 ml-2" />
      </div>
      {showYearSelect && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
          style={{ width: "90px" }}
        >
          {Array.from({ length: 60 }, (_, index) => {
            const year = 1964 + index;
            return (
              <div
                key={year}
                onClick={() => handleYearChange(year)}
                className={`p-2 cursor-pointer hover:bg-pink-200 ${
                  currentDate.getFullYear() === year
                    ? "bg-pink-500 text-white"
                    : ""
                }`}
              >
                {year}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YearSelect;
