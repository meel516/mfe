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
import BlogLayout from "../Layouts/BlogLayout.jsx";
import ViewAllBlogs from "../Pages/ViewAllBlogs.tsx";
import UserStats from "../components/UserStats.tsx";
const Index = () => {
  const allRoutes = useRoutes([
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        { path: "", element: <Home /> },

        {
          path: "blog",
          element: <Outlet />,

          children: [
            {
              path: "",
              element: <ViewAllBlogs />,
            },

            {
              path: ":id",
              element: <BlogsView />,
            },
          ],
        },
        {
          path: "user",
          element: <BlogLayout />,
          children: [
            {
              path: "",
              element: <UserStats />,
            },
            {
              path: "blogs",
              element: <Outlet />,
              children: [
                {
                  path: "",
                  element: <Blogs />,
                },
                { path: "create", element: <CreateBlog /> },
                { path: ":id", element: <BlogView /> },
                { path: ":id/edit", element: <CreateBlog mode="edit" /> },
              ],
            },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return allRoutes;
};
export default Index;
