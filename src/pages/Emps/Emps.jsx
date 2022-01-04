import React from "react";
import EmpsList from "./EmpsList";
import EmpForm from "./EmpForm";
import { getAll, addNew, updateData, deleteData } from "../../services/emps";
import { getAll as RolesList } from "../../services/roles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Emps extends React.Component {
  state = {
    emps: [],
    data: { FULLNAME: {}, EMAIL: {}, PHONE: {}, ROLE_ID: {} },
    viewMode: "view",
    fields: [
      {
        label: "Full Name",
        type: "text",
        id: "FULLNAME",
        value: "",
      },
      {
        label: "Email",
        type: "email",
        id: "EMAIL",
        value: "",
      },
      {
        label: "Phone",
        type: "tel",
        id: "PHONE",
        value: "",
      },
      {
        label: "Role",
        type: "select",
        id: "ROLE_ID",
        value: "",
      },
    ],
  };

  async componentDidMount() {
    let emps = await getAll();
    emps = emps.data.rows;

    // ********** DYNAMIC OPTIONS LOADED FOR SELECT ********
    let rolesList = await RolesList();
    rolesList = rolesList.data.rows.map((role) => {
      return {
        value: role.ID,
        label: role.NAME,
      };
    });

    const fields = this.state.fields.map((field) => {
      if (field.id === "ROLE_ID") field.options = rolesList;
      return field;
    });
    // ********** DYNAMIC OPTIONS LOADED FOR SELECT ********

    this.setState({ emps, fields });
  }

  refreshData = async () => {
    let emps = await getAll();
    emps = emps.data.rows;
    const viewMode = "view";
    this.setState({ emps, viewMode });
  };

  handleOnChange = (value, input) => {
    const data = { ...this.state.data };
    data[input.id] = value;
    // let fields = this.state.fields.map((s) => (s = { ...s, value: value }));
    // console.log(value, data);
    this.setState({ data });
  };

  handleAddNew = async () => {
    const result = await addNew(this.state.data);
    // console.log(result);
    if (result.data.rowsAffected > 0) {
      toast(`'${this.state.data.FULLNAME}' is added.`);
      this.refreshData();
    }
  };

  handleOnEdit = (state) => {
    // console.log(state.target.id);
    let data = this.state.emps.filter((r) => r.ID === Number(state.target.id));
    // console.log(data);
    if (data.length > 0) {
      data = data[0];
      this.setState({ viewMode: "edit", data });
    }
  };

  handleOnDelete = async (state) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    const _id = state.target.id;
    if (_id) {
      const result = await deleteData(_id);
      if (result.data.rowsAffected > 0) {
        toast(`'${_id}' is deleted.`);
        this.refreshData();
      }
    }
  };

  handleUpdate = async () => {
    console.log(this.state.data);
    const result = await updateData(this.state.data);
    if (result.data.rowsAffected > 0) {
      toast(`'${this.state.data.FULLNAME}' is updated.`);
      this.refreshData();
    }
  };

  getHeading = () => {
    return this.state.viewMode === "view"
      ? "All Records"
      : this.state.viewMode === "new"
      ? "Add New"
      : "Edit Record";
  };

  render() {
    const { data, emps, viewMode, fields } = this.state;
    console.log(data);
    return (
      <div>
        <h2>{this.getHeading()}</h2>

        {viewMode === "view" && (
          <button
            onClick={() => this.setState({ viewMode: "new", data: {} })}
            className="btn btn-primary"
          >
            Add New
          </button>
        )}
        {viewMode !== "view" && (
          <>
            <EmpForm
              fields={fields}
              onAddNew={this.handleOnChange}
              data={data}
            />
            {viewMode === "new" && (
              <button
                onClick={() => this.handleAddNew()}
                className="btn btn-success"
              >
                Save
              </button>
            )}
            {viewMode === "edit" && (
              <button
                onClick={() => this.handleUpdate()}
                className="btn btn-success"
              >
                Update
              </button>
            )}
            <button
              onClick={() => this.setState({ viewMode: "view" })}
              className="btn btn-danger m-2"
            >
              Cancel
            </button>
          </>
        )}

        {viewMode === "view" && (
          <EmpsList
            emps={emps}
            onEdit={this.handleOnEdit}
            onDelete={this.handleOnDelete}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Emps;
