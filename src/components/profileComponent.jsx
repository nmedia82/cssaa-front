import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Input from "./Input";
import jamaats from "./../data/jamaats.json";
import PrintData from "./PrintData";

class Profile extends Component {
  state = {
    profile: {},
    userData: [
      { label: "Fullname", id: "fullname", type: "text" },
      { label: "Email", id: "email", type: "email" },
      { label: "Phone", id: "phone", type: "tel" },
      { label: "Jamaats", id: "jamaat", type: "select", options: jamaats },
      { label: "DOB", id: "dob", type: "date" },
      { label: "Arrival Time", id: "arrival", type: "time" },
      { label: "Job Title", id: "jobtitle", type: "text" },
      { label: "Education List", id: "edu", type: "select", options: jamaats },
    ],
  };

  handleProfileUpdate = (value, input) => {
    // const profile = { ...this.state.profile, [e.target.name]: e.target.value };
    // console.log(profile);
    // this.setState({ profile });
    console.log(value);
    const data = [...this.state.userData];
    const index = data.indexOf(input);
    data[index]["value"] = value;
    this.setState({ userData: data });
  };

  render() {
    const { userData } = this.state;

    return (
      <>
        <div class="row">
          <h1>Profile</h1>
          <div className="col-md-6">
            <PrintData data={userData} />
          </div>
          <div className="col-md-6">
            {userData.map((data, index) => {
              console.log(data);
              return (
                <Input
                  key={index}
                  data={data}
                  onUpdate={this.handleProfileUpdate}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
