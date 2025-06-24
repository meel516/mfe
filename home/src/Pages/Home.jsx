import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://nodejstarter.onrender.com/v1/blogs"
        );
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {}
    })();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MyBlog</h1>
          <nav>
            <Link
              to="/login"
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-sm font-semibold transition"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center bg-white">
        {" "}
        <div className="bg-gray-50 min-h-screen pt-24 px-4 md:px-12">
          {/* Recommended Blogs */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Recommended for You
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    handleClick={() => (window.location.href = `/${blog._id}`)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No recommendations yet.</p>
              )}
            </div>
          </section>

          {/* Latest Blogs */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Latest Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    handleClick={() => (window.location.href = `/${blog._id}`)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No blogs available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
