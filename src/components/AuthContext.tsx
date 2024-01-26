import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null;
};
export const userRole = () => {
    const jwt = localStorage.getItem("access_token");
    if (jwt) {
      const user = jwtDecode(String(jwt));
      console.log("AUTH COMPONENT- Loged user", user);
      return user;
    }
}

export const login = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
