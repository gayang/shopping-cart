import React from "react";

export default function Logout() {
  localStorage.removeItem("access_token");
  window.location.href = "/products";
  return null;
}
