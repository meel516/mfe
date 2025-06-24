import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogDetail = ({ image, title, description, createdAt, user }) => {
  return (
    <section className="max-w-4xl mx-auto bg-white p-8 mt-12 shadow-lg rounded-lg">
      {/* Hero Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-md mb-8"
        />
      )}

      {/* Title & Meta */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500">
          By <strong>{user?.name}</strong> ·{" "}
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Content */}
      <article className="prose prose-lg prose-indigo max-w-none">
        <ReactQuill readOnly theme="bubble" value={description} />
      </article>
    </section>
  );
};

export default BlogDetail;
