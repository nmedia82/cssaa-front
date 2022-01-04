import DataTable from "react-data-table-component";

// const handleButtonClick = (state) => {
//   console.log("clicked");
//   console.log(state.target.id);
// };
function RolesList({ roles, onEdit, onDelete }) {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.NAME,
      sortable: false,
    },
    {
      cell: (row) => (
        <button className="btn btn-success" onClick={onEdit} id={row.ID}>
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <button className="btn btn-danger" onClick={onDelete} id={row.ID}>
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  // console.log(roles);
  return (
    <>
      <DataTable columns={columns} data={roles} selectableRows />
    </>
  );
}

export default RolesList;
