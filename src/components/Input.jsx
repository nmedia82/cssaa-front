import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
// import DateInput from "./inputs/DateInput";

const getInputType = (data) => {
  let type = "";
  switch (data.type) {
    case "text":
    case "email":
    case "date":
    case "time":
    case "tel":
    case "number":
    case "password":
      type = "text";
      break;
    default:
      type = data.type;
      break;
  }
  return type;
};

function Input({ meta, onUpdate, data }) {
  return (
    <>
      {getInputType(meta) === "text" && (
        <TextInput meta={meta} onUpdate={onUpdate} data={data} />
      )}
      {getInputType(meta) === "select" && (
        <SelectInput meta={meta} onUpdate={onUpdate} data={data} />
      )}
    </>
  );
}

export default Input;
