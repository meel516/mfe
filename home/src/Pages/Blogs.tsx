import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import { FiEdit3, FiPlus, FiImage, FiArrowLeft } from "react-icons/fi";

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
      <div className="space-y-6">
        {/* Create Button with Floating Animation */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("create")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create Blog
          </button>
        </motion.div>

        {/* Blog Grid with Hover Effects */}
        <div className="grid gap-6 grid-cols-2">
          {blogs?.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <BlogCard
                blog={blog}
                handleClick={() => navigate(`${blog._id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {blogs?.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No blogs yet
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by creating your first blog post.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("create")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
