import React, { FormEvent, useState } from "react";
import Input from "../common/Input";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  registerUsersAsync,
  updateUserAsync,
} from "../../redux/reducers/usersReducer";
import { NavLink } from "react-router-dom";

const UpdateUser = () => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [userUpdateInfo, setUserUpdateInfo] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    phoneNumber: 0,
    role: "",
  });
  const [error, setError] = useState<string | null>(null);

  // const handleInputChange = (e: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setUserUpdateInfo((prevState) => ({
  //     ...prevState,
  //     [name]: name === "phoneNumber" ? parseInt(value) || 0 : value,
  //   }));
  // };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatch(
      updateUserAsync({
        ...users,
        [e.target.name]: e.target.value,
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      })
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //try {
    //dispatch(registerUsersAsync(userUpdateInfo));
    //} catch (ex.response && ex.response.status === 400) {

    //}
  };

  return (
    <div className="form">
      <div>
        <NavLink className="btn-update" to="../admin/view-users">
          Back
        </NavLink>
      </div>
      <h1>Update user</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={userUpdateInfo.firstName}
          label="Name"
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
        <button
          type="button"
          onClick={() => dispatch(updateUserAsync(userUpdateInfo))}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
