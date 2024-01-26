import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./common/Input";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUsersAsync } from "../redux/reducers/usersReducer";
import jwtDecode from "jwt-decode";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
    avatar: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    console.log("validate succsess", userInfo);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sssss");
    validate();
    //try {
    const response = await dispatch(registerUsersAsync(userInfo));
    const jwt = localStorage.getItem("access_token");
    console.log(jwt);
    navigate("/login");
    //const user = jwtDecode(jwt);
    //window.location.href = "/products";

    // } catch (error) {
    //     if (error.response) {
    //         console.error("Error Response:", error.response.status, error.response.data);
    //     } else if (error.request) {
    //         console.error("Error Request:", error.request);
    //     } else {
    //         console.error('Error:', error.message);
    //     }
    // }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          id="firstName"
          value={userInfo.firstName}
          label="Name"
          error={error}
          onChange={handleInputChange}
          type="text"
          className="form-control"
        />
        <Input
          name="lastName"
          id="lastName"
          value={userInfo.lastName}
          label="lastName"
          error={error}
          onChange={handleInputChange}
          type="text"
          className="form-control"
        />
        <Input
          name="email"
          id="email"
          value={userInfo.email}
          label="Email"
          error={error}
          onChange={handleInputChange}
          type="text"
          className="form-control"
        />
        <Input
          name="password"
          id="password"
          value={userInfo.password}
          error={error}
          label="Password"
          onChange={handleInputChange}
          type="password"
          className="form-control"
        />
        <button className="form-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
