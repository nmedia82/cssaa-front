import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Roles from "./pages/Roles/Roles";
import Emps from "./pages/Emps/Emps";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/employees" element={<Emps />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/not-found" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
