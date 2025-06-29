import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBookmark,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiUserPlus,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserStats = () => {
  // Mock data - replace with your actual data
  const [stats, setStats] = useState({
    saved: 12,
    drafts: 3,
    deleted: 5,
    followers: 42,
    following: 28,
  });

  const [expandedView, setExpandedView] = useState("saved");

  const toggleView = (view) => {
    setExpandedView(expandedView === view ? null : view);
  };
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-md p-4 w-full min-h-screen"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Saved Posts */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => toggleView("saved")}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            expandedView === "saved"
              ? "bg-purple-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiBookmark className="text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Saved</span>
            </div>
            <span className="font-bold text-gray-900">{stats.saved}</span>
          </div>
        </motion.div>

        {/* Drafts */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => toggleView("drafts")}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            expandedView === "drafts"
              ? "bg-blue-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiEdit className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Drafts</span>
            </div>
            <span className="font-bold text-gray-900">{stats.drafts}</span>
          </div>
        </motion.div>

        {/* Deleted */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => toggleView("deleted")}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            expandedView === "deleted"
              ? "bg-red-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTrash2 className="text-red-600" />
              <span className="text-sm font-medium text-gray-700">Deleted</span>
            </div>
            <span className="font-bold text-gray-900">{stats.deleted}</span>
          </div>
        </motion.div>
      </div>

      {/* Follow Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Followers */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => toggleView("followers")}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            expandedView === "followers"
              ? "bg-green-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUsers className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Followers
              </span>
            </div>
            <span className="font-bold text-gray-900">{stats.followers}</span>
          </div>
        </motion.div>

        {/* Following */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => toggleView("following")}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            expandedView === "following"
              ? "bg-indigo-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUserPlus className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">
                Following
              </span>
            </div>
            <span className="font-bold text-gray-900">{stats.following}</span>
          </div>
        </motion.div>
      </div>

      {/* Expanded View */}
      {expandedView && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gray-50 rounded-lg p-4 mb-2"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800 capitalize">
              {expandedView === "following"
                ? "People You Follow"
                : expandedView === "followers"
                ? "Your Followers"
                : expandedView === "saved"
                ? "Saved Posts"
                : expandedView === "drafts"
                ? "Drafted Posts"
                : "Deleted Posts"}
            </h3>
            <button
              onClick={() => setExpandedView(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          </div>

          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">
              {expandedView === "following"
                ? `You're following ${stats.following} people`
                : expandedView === "followers"
                ? `${stats.followers} people follow you`
                : expandedView === "saved"
                ? `${stats.saved} posts saved for later`
                : expandedView === "drafts"
                ? `${stats.drafts} unpublished drafts`
                : `${stats.deleted} posts in trash`}
            </p>
            <button
              onClick={() => {
                // if(expandedView === "following") navigate("/following");
                // if (expandedView === "followers") navigate("/followers");
                if (expandedView === "saved") navigate("blogs");
                if (expandedView === "drafts") navigate("blogs");
                if (expandedView === "deleted") navigate("blogs");
              }}
              className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-800"
            >
              View all {expandedView}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserStats;
