import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { deleteProductAsync } from "../../redux/reducers/productsReducer";
import { fetchUsersAsync } from "../../redux/reducers/usersReducer";

import User from "../../types/User";
//import UpdateUser from "./UpdateUser";

function ViewUserList() {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState<string | undefined>();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [offset, 25]);

  const handleLoadMore = () => {
    setOffset(offset + limit);
  };

  //Delete
  const handleDelete = (item: User) => {
    const originalList = users;
    const newList = users.filter((p) => p._id !== item._id);

    //setItemDelete(newList);
    try {
      dispatch(deleteProductAsync(item._id));
      navigate("/admin/view-products");
    } catch (error) {
      //if (error.respose && error.respose === 404)
      alert("This post has already been deleted.");
      //else {
      alert("An unexpected error occurred.");
      //}
    }
    //setItemDelete(originalList);
  };

  const updateSelectedItem = (item: string) => {
    //dispatch(registerUsersAsync({ name, email, password, avatar: avatar1 }));
  };

  return (
    <React.Fragment>
      <div className="data-cotntainer-left">
        <h1>User Management</h1>
        <div className="admin-nav">
          <button onClick={handleLoadMore}>Load More</button>
          &nbsp;&nbsp;&nbsp;
          <NavLink to="../admin/add-user">Add</NavLink>
        </div>
        <p>Showing {users.length} users</p>
        <table className="table">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Role </th>
              <th>First name </th>
              <th>Last name </th>
              <th>Email </th>
              <th>Phone number </th>
              <th>Update </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => {
              return (
                <tr className="product-grid" key={item._id}>
                  {/* <td>{item._id}</td> */}
                  <td>{item.role}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>
                    <NavLink
                      className="btn-update"
                      to="../admin/update-user"
                      onClick={() => updateSelectedItem(item._id)}
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default ViewUserList;
