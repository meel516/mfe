import React, { useState } from "react";

const BlogCard = ({ blog, handleClick = () => {} }) => {
  const { title, description, image, user, createdAt } = blog;
  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull((prev) => !prev);

  const getTruncatedHTML = (html, limit = 80) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg cursor-pointer overflow-hidden max-w-md w-full mx-auto flex flex-col"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
        {image ? (
          <img src={image} alt={title} className="object-cover w-full h-full" />
        ) : (
          "No Image"
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        <div className="text-gray-600 text-sm mb-4">
          {showFull ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p>{getTruncatedHTML(description)}</p>
          )}
          {description.length > 150 && (
            <button
              className="mt-2 text-blue-600 hover:underline text-sm font-medium"
              onClick={toggleShow}
            >
              {showFull ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="flex mt-auto items-center justify-between text-sm text-gray-500">
          <span>
            By: <strong>{user?.name}</strong>
          </span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
