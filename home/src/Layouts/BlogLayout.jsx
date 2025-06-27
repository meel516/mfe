import React from "react";
import { Outlet } from "react-router-dom";
import User from "../Pages/User";

const BlogLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-7">
        <Outlet />
      </div>
      <div className="col-span-5">
        <User />
      </div>
    </div>
  );
};

export default BlogLayout;
