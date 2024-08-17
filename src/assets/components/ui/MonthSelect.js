import { format } from "date-fns";

const MonthSelect = ({
  currentDate,
  handleMonthChange,
  showMonthSelect,
  toggleMonthSelect,
}) => {
  return (
    <div className="relative">
      <div
        className="font-semibold text-base cursor-pointer"
        style={{ minWidth: "95px", textAlign: "center" }}
        onClick={toggleMonthSelect}
      >
        {format(currentDate, "MMMM")}
      </div>
      {showMonthSelect && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
          style={{ width: "139px" }}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              onClick={() => handleMonthChange(index)}
              className={`p-2 cursor-pointer hover:bg-pink-200 ${
                currentDate.getMonth() === index ? "bg-pink-500 text-white" : ""
              }`}
            >
              {format(new Date(2024, index), "MMMM")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthSelect;
