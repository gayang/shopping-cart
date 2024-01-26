import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Root from "./pages/Root";
import Error from "./pages/ErrorPage";
import Products from "./pages/ProductsPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ViewProductList from "./components/admin/ViewProductList";
import ViewUserList from "./components/admin/ViewUserList";
import AddUser from "./components/admin/AddUser";
import Updateprofile from "./components/UpdateProfile";
import Logout from "./components/Logout";
import Profile from "./pages/ProfilePage";
import AddProduct from "./components/admin/AddProduct";
import UpdateUser from "./components/admin/UpdateUser";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProductDetails from "./components/ProductDetails";
import ProductCategory from "./components/ProductDetails";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import useAuth from "./hooks/useAuth";
import UserRole from "./types/UserRole";
import Order from "./types/Order";

const App = () => {
  const [userRole, setUserRole] = useState<"ADMIN" | "USER" | null>(null);
  const userType = "ADMIN";
  const [order, setOrder] = useState<Order>({
    user: "",
    products: "",
    shipping: {
      address: "",
      method: "",
      cost: 0,
    },
    payment: {
      method: "",
      status: "",
    },
    total: 0
  });

  useEffect(() => {
    const jwt = localStorage.getItem("access_token");
    try {
      const user: UserRole = jwtDecode(String(jwt));
      const role = user.role;
      setUserRole(role);
    } catch (error) {}
  }, []);

  const isLoggedIn = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:productId",
          element: <ProductDetails />,
        },
        {
          path: ":productId",
          element: <ProductCategory />,
        },
        {
          path: "register",
          element: <RegisterForm />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "profile",
          element: isLoggedIn ? <Profile /> : <Error />,
        },
        {
          path: "profile/:userId",
          element: isLoggedIn ? <Updateprofile /> : <Error />,
        },
        {
          path: "cart",
          element: (
            <Cart
              user={order.user}
              product={order.products}
              shipping={order.shipping}
              payment={order.payment}
              total={order.total}
            />
          ),
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "admin/view-products",
          element:
            isLoggedIn && userRole === userType ? (
              <ViewProductList />
            ) : (
              <Error />
            ),
        },
        {
          path: "admin/add-product",
          element:
            isLoggedIn && userRole === userType ? <AddProduct /> : <Error />,
        },
        {
          path: "admin/view-products/:productId",
          element:
            isLoggedIn && userRole === userType ? <UpdateProduct /> : <Error />,
        },
        {
          path: "admin/view-users",
          element:
            isLoggedIn && userRole === userType ? <ViewUserList /> : <Error />,
        },
        {
          path: "admin/add-user",
          element:
            isLoggedIn && userRole === userType ? <AddUser /> : <Error />,
        },
        {
          path: "admin/update-users/userid",
          element:
            isLoggedIn && userRole === userType ? <UpdateUser /> : <Error />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
