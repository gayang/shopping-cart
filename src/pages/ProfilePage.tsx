import React, { useState } from "react";
import useAppSelector from "./../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import User from "../types/User";
import {
  checkEmailUsersAsync,
  loginUserAsync,
} from "../redux/reducers/usersReducer";

function ProfilePage() {
  const dispatch = useAppDispatch();
  //const currentUser = useAppSelector((state) => state.usersReducer);
  //console.log("currentUser", currentUser);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  console.log("NAV BAR CURRENTUSER>", currentUser);
  return (
    <div>
      
      {currentUser && (
        <>
          <h1>Profile</h1>
          <img
            src={currentUser.avatar}
            width="150"
            aspect-ratio="auto"
            alt={currentUser.firstName}
          />
          <div className="profile">
            <label>First name</label>
            <label>{currentUser.firstName}</label>
          </div>
          <div className="profile">
            <label>Last name</label>
            <label>{currentUser.lastName}</label>
          </div>
          <div className="profile">
            <label>email</label>
            <label>{currentUser.email}</label>
          </div>
          <div className="profile">
            <label>Phone number</label>
            <label>{currentUser.phoneNumber}</label>
          </div>

          <p>
            <Link to={`${currentUser._id}`}>Edit details</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
