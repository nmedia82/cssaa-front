import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput({ data, onUpdate }) {
  const handleUpdate = (value, data) => {
    onUpdate(value, data);
  };
  return (
    <DatePicker
      autoComplete="off"
      onChange={(value) => handleUpdate(value, data)}
    />
  );
}

export default DateInput;
