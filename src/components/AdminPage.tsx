import React from "react";
import { Link, NavLink } from "react-router-dom";
import ViewAllProducts from "./admin/ViewProductList";

export default function AdminPage() {
  return (
    <div className="admin-area">
      <div className="admin-area-l">
        <h3>Product Management</h3>
        <NavLink to="view-products">Products</NavLink>
        <h3>User Management</h3>
        <NavLink to="view-users">Users</NavLink>
      </div>
      <div className="admin-area-r">
        <ViewAllProducts />
      </div>
    </div>
  );
}
