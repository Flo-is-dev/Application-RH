import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerContainer = ({ error }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        placeholderText="Select a date"
        className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md`}
      />
    </div>
  );
};

export default DatePickerContainer;
