import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

import logo from "./assets/logo.webp";
import useAppSelector from "../hooks/useAppSelector";
import useAuth from "../hooks/useAuth";
import UserRole from "../types/UserRole";

const NavBar = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const [userRole, setUserRole] = useState<"ADMIN" | "USER" | null>(null);
  const isLoggedIn = useAuth();
  const userType = "ADMIN";

  useEffect(() => {
    getUser;
    const jwt = localStorage.getItem("access_token");
    try {
      const user: UserRole = jwtDecode(String(jwt));
      const role = user.role;
      setUserRole(role);
    } catch (error) {}
  }, []);

  const getUser = () => {
    const currentUser = useAppSelector((state) => state.usersReducer.currentUser );
    console.log(currentUser);
  };

  return (
    <>
      <div className="navbar">
        <div className="menu-icon" id="menu-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className="nav-list" id="nav-list">
          <li>
            <Link to="/index">
              <img src={logo} height="30" width="30" />
            </Link>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
        </ul>
        <ul className="nav-list">
          <li>
            <NavLink to="/cart">{cart.length > 0 && cart.length}</NavLink>
          </li>

          {!isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </React.Fragment>
          )}
          {isLoggedIn && (
            <React.Fragment>
              <li>Welcome</li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              {userRole === userType && (
                <React.Fragment>
                  <li>
                    <NavLink to="/admin/view-products">
                      Products Management
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/view-users">User Management</NavLink>
                  </li>
                </React.Fragment>
              )}
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
