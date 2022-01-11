import "./App.css";
import React from "react";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";
import { isLoggedin } from "./services/cache";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Roles from "./pages/Roles/Roles";
import Emps from "./pages/Emps/Emps";
import Login from "./pages/Auth/Login";

function RequireAuth() {
  let location = useLocation();

  if (!isLoggedin()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/employees" element={<Emps />} />
              <Route path="/roles" element={<Roles />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/not-found" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
