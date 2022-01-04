const TextInput = ({ meta, onUpdate, data }) => {
  // local update handler so value should be consistent for all inputs
  const handleUpdate = (e, data) => {
    onUpdate(e.target.value, data);
  };

  const { label, id, type } = meta;
  return (
    <p>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={id}
        type={type}
        name={id}
        value={data[id]}
        onChange={(e) => handleUpdate(e, meta)}
      />
    </p>
  );
};

export default TextInput;
