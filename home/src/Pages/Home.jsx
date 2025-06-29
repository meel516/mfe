import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiBookmark,
  FiClock,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://nodejstarter.onrender.com/v1/blogs"
        );
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Sort blogs by date for "Latest Posts" section
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Sort blogs by popularity (example - could use views/likes)
  const recommendedBlogs = [...blogs]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Discover & Share
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Amazing Stories
              </span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Explore insightful articles from our community of writers and
              share your own perspectives.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link
                to="user/blogs/create"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start Writing
              </Link>
              <Link
                to="/blog"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Explore More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Recommended Blogs */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <FiTrendingUp className="text-2xl text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended for You
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : recommendedBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recommendedBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <BlogCard
                    blog={blog}
                    handleClick={() =>
                      (window.location.href = `blog/${blog._id}`)
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No recommendations yet. Start following topics to get
                personalized recommendations.
              </p>
            </div>
          )}
        </motion.section>

        {/* Latest Blogs */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FiClock className="text-2xl text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
          </div>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : latestBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <BlogCard
                    blog={blog}
                    handleClick={() =>
                      (window.location.href = `blog/${blog._id}`)
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blogs available yet. Be the first to create one!
              </p>
            </div>
          )}

          {blogs.length > 3 && (
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all"
              >
                View All Posts
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Home;
