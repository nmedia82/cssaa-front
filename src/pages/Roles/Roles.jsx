import React from "react";
import RolesList from "./RolesList";
import RoleForm from "./RoleForm";
import { getAll, addNew, updateData, deleteData } from "./../../services/roles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Roles extends React.Component {
  state = {
    roles: [],
    data: { NAME: {} },
    viewMode: "view",
    fields: [
      {
        label: "Role Name",
        type: "text",
        id: "NAME",
        value: "",
      },
    ],
  };

  async componentDidMount() {
    let roles = await getAll();
    roles = roles.data.rows;
    this.setState({ roles });
  }

  refreshData = async () => {
    let roles = await getAll();
    roles = roles.data.rows;
    const viewMode = "view";
    this.setState({ roles, viewMode });
  };

  handleOnChange = (value, input) => {
    const data = { ...this.state.data };
    data[input.id] = value;
    // let fields = this.state.fields.map((s) => (s = { ...s, value: value }));
    // console.log(data);
    this.setState({ data });
  };

  handleAddNew = async () => {
    const result = await addNew(this.state.data);
    // console.log(result);
    if (result.data.rowsAffected > 0) {
      toast(`New Role '${this.state.data.NAME}' is added.`);
      this.refreshData();
    }
  };

  handleOnEdit = (state) => {
    // console.log(state.target.id);
    let data = this.state.roles.filter((r) => r.ID === Number(state.target.id));
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
      toast(`'${this.state.data.NAME}' is updated.`);
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
    const { data, roles, viewMode, fields } = this.state;
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
            <RoleForm
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
          <RolesList
            roles={roles}
            onEdit={this.handleOnEdit}
            onDelete={this.handleOnDelete}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Roles;
