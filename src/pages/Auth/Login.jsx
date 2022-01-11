import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doLogin } from "../../services/emps";
import { setUser, setToken } from "../../services/cache";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/Input";

function Login() {
  let navigate = useNavigate();
  const [data, setData] = useState();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fields = [
      {
        label: "USER ID",
        type: "number",
        id: "ID",
        value: "",
      },
      {
        label: "Password",
        type: "password",
        id: "PWD",
        value: "",
      },
    ];
    const data = { ID: {}, PWD: {} };
    setFields(fields);
    setData(data);
  }, [setFields, setData]);

  const handleOnChange = (value, input) => {
    const data2 = { ...data };
    data2[input.id] = value;
    setData(data2);
  };

  const handleLogin = async () => {
    const result = await doLogin(data);
    const { status, user, token } = result.data;
    console.log(result);
    if (status) {
      setUser(user);
      setToken(token);
      toast.success(`Login Successful...`);

      navigate("/", { replace: true });
    } else {
      toast.error(`Error in login, try again.`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {fields.map((meta, index) => {
        console.log(meta);
        return (
          <Input
            key={index}
            meta={meta}
            onUpdate={handleOnChange}
            data={data}
          />
        );
      })}

      <button className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
      <ToastContainer />
    </div>
  );
}

export default Login;
