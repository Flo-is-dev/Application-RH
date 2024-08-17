import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

const DaysGrid = ({ currentDate, selectedDate, handleDateClick }) => {
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
      {days.map((day) => (
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 text-center border border-gray-200 cursor-pointer ${
            isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : ""
          }`}
        >
          {format(day, "d")}
        </div>
      ))}
    </div>
  );
};

export default DaysGrid;
