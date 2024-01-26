import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Input from "./common/Input";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  checkEmailUsersAsync,
  loginUserAsync,
} from "../redux/reducers/usersReducer";
import UsersReducerState from "../types/UsersReducerState";

interface User {
  email: string;
  role: "ADMIN";
}

const LoginForm = () => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [ setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("access_token");
    if (jwt) {
      const user: User = jwtDecode(String(jwt));
     //setUser(user);
      console.log("LOGIN", user);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await dispatch(loginUserAsync(userInfo));
      const jwt = localStorage.getItem("access_token");
      const user: User = jwtDecode(String(jwt));
      //setCurrentUser(user);
      console.log("LOGIN user : ", user);
      console.log("LOGIN currentUser", currentUser);
     // window.location.href = "/products";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          label="Password"
          error={error}
          onChange={handleInputChange}
          type="password"
          className="form-control"
        />
        <button className="form-btn" type="submit" id="submit">
          Submit
        </button>
        <p>Are you a new customer? Create account</p>
        <p>Forgot my password.. </p>
      </form>
    </div>
  );
};

export default LoginForm;
