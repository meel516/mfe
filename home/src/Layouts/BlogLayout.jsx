import React from "react";
import { Outlet } from "react-router-dom";
import User from "../Pages/User";
import { motion } from "framer-motion";

const BlogLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (Blog Posts) */}
          <motion.div
            className="col-span-1 lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Outlet />
            </div>
          </motion.div>

          {/* Sidebar Area (User Profile) */}
          <motion.div
            className="col-span-1 lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <User />
            </div>

            {/* Additional Sidebar Widgets */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Design",
                  "React",
                  "JavaScript",
                  "CSS",
                  "Web Development",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Newsletter
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to get the latest posts delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
