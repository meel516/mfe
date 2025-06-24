import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import BlogDetail from "../components/BlogDetail";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://nodejstarter.onrender.com/v1/blogs/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);
  const navigate = useNavigate();
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found.</div>;

  const { title, description, image, user, createdAt } = blog;

  return (
    <>
      <div className="flex justify-end px-3 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/blog/edit/" + id)}
        >
          Edit Blog
        </button>
      </div>
      <BlogDetail
        image={image}
        title={title}
        description={description}
        createdAt={createdAt}
        user={user}
      />
    </>
  );
};

export default BlogView;
