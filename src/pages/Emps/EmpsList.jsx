import DataTable from "react-data-table-component";

// const handleButtonClick = (state) => {
//   console.log("clicked");
//   console.log(state.target.id);
// };
function EmpsList({ emps, onEdit, onDelete }) {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "FULLNAME",
      selector: (row) => row.FULLNAME,
      sortable: false,
    },
    {
      name: "PHONE",
      selector: (row) => row.PHONE,
      sortable: false,
    },
    {
      name: "EMAIL",
      selector: (row) => row.EMAIL,
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
  // console.log(emps);
  return (
    <>
      <DataTable columns={columns} data={emps} selectableRows />
    </>
  );
}

export default EmpsList;
