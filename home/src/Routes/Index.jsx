import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Login from "../Pages/Login.tsx";
import User from "../Pages/User.tsx";
import CreateBlog from "../Pages/CreateBlog.tsx";
import PrivateLayout from "../Layouts/PrivarteLayout.tsx";
import BlogView from "../Pages/BlogView.tsx";
import Blogs from "../Pages/Blogs.tsx";
import Home from "../Pages/Home.jsx";
import BlogsView from "../Pages/BlogsView.tsx";
import Register from "../Pages/Register.tsx";
const Index = () => {
  const allRoutes = useRoutes([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: ":id",
          element: <BlogsView />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        {
          path: "user",
          element: <User />,
        },
        {
          path: "blog",
          element: <Outlet />,

          children: [
            {
              path: "",
              element: <Blogs />,
            },
            {
              path: "create",
              element: <CreateBlog />,
            },
            {
              path: ":id",
              element: <BlogView />,
            },
            {
              path: "edit/:id",
              element: <CreateBlog mode="edit" />,
            },
          ],
        },
      ],
    },
  ]);
  return allRoutes;
};

export default Index;
