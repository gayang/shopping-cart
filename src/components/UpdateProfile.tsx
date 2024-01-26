import React, { FormEvent, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Input from "./common/Input";
import useAppDispatch from "./../hooks/useAppDispatch";
import useAppSelector from "./../hooks/useAppSelector";
import {
  updateUserAsync,
  authenticateUserAsync,
} from "../redux/reducers/usersReducer";
import jwtDecode from "jwt-decode";
import UserCreation from "../types/UserCreation";
import User from "../types/User";

const UpdateUser = () => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userUpdateInfo, setUserUpdateInfo] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    role: "",
    phoneNumber: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("access_token");
        if (jwt != null) {
          const user = jwtDecode(String(jwt));
          const result = await dispatch(authenticateUserAsync(jwt));
          console.log("RESULT", result.payload);

          setIsLoading(false);

          // const {
          //   _id,
          //   firstName,
          //   lastName,
          //   email,
          //   password,
          //   avatar,
          //   role,
          //   phoneNumber,
          // } = result.payload;

          // setUserUpdateInfo({
          //   _id: _id,
          //   firstName: firstName,
          //   lastName: lastName,
          //   email: email,
          //   password: password,
          //   avatar: avatar,
          //   role: role,
          //   phoneNumber: phoneNumber,
          // });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdateInfo({
      ...userUpdateInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserAsync(userUpdateInfo));
    navigate("/profile");
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form">
      <h1>Update user details</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          value={userUpdateInfo.firstName}
          label="First name"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="lastName"
          value={userUpdateInfo.lastName}
          label="Last name"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="email"
          value={userUpdateInfo.email}
          label="Email"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
          readOnly={true}
        />
        <Input
          name="password"
          value={userUpdateInfo.password}
          label="Password"
          onChange={handleInputChange}
          error={error}
          type="password"
          className="form-control"
        />
        <Input
          name="avatar"
          value={userUpdateInfo.avatar}
          label="Avatar"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="phoneNumber"
          value={userUpdateInfo.phoneNumber}
          label="PhoneNumber"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <button className="form-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
