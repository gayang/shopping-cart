import React, { FormEvent, useState } from "react";
import Input from "../common/Input";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { registerUsersAsync } from "../../redux/reducers/usersReducer";
import { Link, NavLink } from "react-router-dom";

const AddUser = () => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const [addUserInfo, setAddUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddUserInfo({
      ...addUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const avatar1 =
    "https://coolmomscooltips.com/wp-content/uploads/2020/03/Sonic-the-hedgehog-activity-sheets-cool-moms-cool-tips-min-465x698.jpg";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //try {
    dispatch(registerUsersAsync(addUserInfo));
    //} catch (ex.response && ex.response.status === 400) {

    //}
  };

  return (
    <div className="form">
      <h1>Add user</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={addUserInfo.firstName}
          label="First name"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="name"
          value={addUserInfo.lastName}
          label="Last name"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="email"
          value={addUserInfo.email}
          label="Email"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <Input
          name="password"
          value={addUserInfo.password}
          label="Password"
          onChange={handleInputChange}
          error={error}
          type="password"
          className="form-control"
        />
        <Input
          name="avatar"
          value={addUserInfo.avatar}
          label="Avatar"
          onChange={handleInputChange}
          error={error}
          type="text"
          className="form-control"
        />
        <button className="form-btn" type="submit">
          Create
        </button>
        <p>
          <Link to="/admin/view-users">Back to usermanagement</Link>
        </p>
      </form>
    </div>
  );
};

export default AddUser;
