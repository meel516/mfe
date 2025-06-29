import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiBookmark, FiShare2, FiClock, FiUser } from "react-icons/fi";

const BlogCard = ({ blog, handleClick = () => {} }) => {
  const { title, description, image, user, createdAt } = blog;
  const [showFull, setShowFull] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleShow = (e) => {
    e.stopPropagation();
    setShowFull(!showFull);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getTruncatedText = (html, limit = 100) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer w-full max-w-md mx-auto flex flex-col h-[500px]"
      onClick={handleClick}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-56 overflow-hidden">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
            {title.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Floating action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            className={`p-2 rounded-full backdrop-blur-sm ${
              isBookmarked
                ? "bg-yellow-400/90 text-white"
                : "bg-white/80 text-gray-700"
            }`}
            onClick={toggleBookmark}
            whileTap={{ scale: 0.9 }}
          >
            <FiBookmark />
          </motion.button>
          <motion.button
            className={`p-2 rounded-full backdrop-blur-sm ${
              isLiked
                ? "bg-pink-500/90 text-white"
                : "bg-white/80 text-gray-700"
            }`}
            onClick={toggleLike}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart fill={isLiked ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
            Technology
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
          {title}
        </h2>

        <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {showFull ? (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="line-clamp-3">{getTruncatedText(description)}</p>
          )}
          {description.length > 100 && (
            <motion.button
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center"
              onClick={toggleShow}
              whileHover={{ x: 2 }}
            >
              {showFull ? "Show Less" : "Read More"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  showFull ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          )}
        </div>

        {/* User Info and Stats */}
        <div className="flex mt-auto items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FiUser className="text-lg" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user?.name || "Anonymous"}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiShare2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
