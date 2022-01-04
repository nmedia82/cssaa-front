import Input from "../../components/Input";

function RoleForm({ fields, onAddNew, data }) {
  return (
    <>
      {fields.map((meta, index) => {
        // console.log(meta);
        return (
          <Input key={index} meta={meta} onUpdate={onAddNew} data={data} />
        );
      })}
    </>
  );
}

export default RoleForm;
