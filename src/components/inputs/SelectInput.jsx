import Select from "react-select";

function SelectInput({ meta, onUpdate, data }) {
  const getSelectedValue = (id) => {
    const value = meta.options.find((m) => m.value === id);
    return value;
  };
  const { label, id } = meta;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Select
        options={meta.options}
        onChange={(value) => onUpdate(value.value, meta)}
        value={getSelectedValue(data["ROLE_ID"])}
      />
    </div>
  );
}

export default SelectInput;
