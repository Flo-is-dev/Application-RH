import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerContainer = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        placeholderText="Select a date"
        className="my-custom-input"
      />
    </div>
  );
};

export default DatePickerContainer;
