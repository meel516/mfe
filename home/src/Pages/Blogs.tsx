import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    (async function fetchBlogs() {
      try {
        const res = await axios.get(
          `https://nodejstarter.onrender.com/v1/blogs/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (res.data.success) {
          setBlogs(res.data.data); // Set raw blog data
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })();
  }, []);
  console.log(blogs);
  return (
    <>
      <div className="flex justify-end px-3 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("create")}
        >
          Create Blog
        </button>
      </div>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        {blogs?.map((blog) => {
          return (
            <BlogCard
              blog={blog}
              handleClick={() => {
                navigate(`/blog/${blog._id}`);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
