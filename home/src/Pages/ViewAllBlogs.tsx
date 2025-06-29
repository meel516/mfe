import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import BlogCard from "../components/BlogCard";

const ViewAllPosts = () => {
  // Mock data - replace with your actual data
  const mockBlogs = [
    {
      _id: "1",
      title: "The Future of Web Development",
      description: "Exploring upcoming trends in frontend technologies",
      image: "https://source.unsplash.com/random/600x400/?webdev",
      tags: ["technology", "webdev", "frontend"],
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Sustainable Living in Urban Areas",
      description: "How to reduce your carbon footprint in the city",
      image: "https://source.unsplash.com/random/600x400/?sustainability",
      tags: ["lifestyle", "sustainability"],
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Mastering React Hooks",
      description: "A deep dive into React's powerful feature",
      image: "https://source.unsplash.com/random/600x400/?react",
      tags: ["technology", "react", "javascript"],
      createdAt: new Date(),
    },
    {
      _id: "4",
      title: "The Art of Mindful Productivity",
      description: "Working smarter without burning out",
      image: "https://source.unsplash.com/random/600x400/?productivity",
      tags: ["productivity", "mindfulness"],
      createdAt: new Date(),
    },
    {
      _id: "5",
      title: "Exploring Hidden Travel Gems",
      description: "Underrated destinations you should visit",
      image: "https://source.unsplash.com/random/600x400/?travel",
      tags: ["travel", "adventure"],
      createdAt: new Date(),
    },
    {
      _id: "6",
      title: "Modern UI Design Principles",
      description: "Creating interfaces users love",
      image: "https://source.unsplash.com/random/600x400/?design",
      tags: ["design", "ui", "ux"],
      createdAt: new Date(),
    },
  ];

  // Mock tags - replace with your actual tags
  const availableTags = [
    "technology",
    "webdev",
    "frontend",
    "lifestyle",
    "sustainability",
    "react",
    "javascript",
    "productivity",
    "mindfulness",
    "travel",
    "adventure",
    "design",
    "ui",
    "ux",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          <p className="text-gray-600 mt-2">
            Browse through our complete collection of articles
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all">
              <FiFilter className="text-gray-600" />
              <span className="text-gray-700 font-medium">Filters</span>
            </button>
          </div>

          {/* Expanded Filters (Hidden by default) */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-6 overflow-hidden"
          >
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Filter by Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-all flex items-center gap-1"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg shadow-sm">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Most Popular</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Period
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg shadow-sm">
                      <option>All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last Year</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg shadow-sm">
                      <option>All Authors</option>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Alex Johnson</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  Reset
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <BlogCard
                blog={blog}
                handleClick={() => (window.location.href = `/${blog._id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-purple-600 text-white">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              2
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              8
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              Next
            </button>
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewAllPosts;
