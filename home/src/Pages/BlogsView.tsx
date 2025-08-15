import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetail from "../components/BlogDetail";
import axios from "axios";
import Comments from "comments/comments";

const BlogsView = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
    user: undefined,
    createdAt: null,
    _id: "",
  });
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://nodejstarter.onrender.com/v1/blogs/${id}`
        );
        if (res.data.success) setBlog(res.data.data);
      } catch (err) {}
    })();
  }, []);
  return (
    <div>
      <BlogDetail
        createdAt={blog.createdAt}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        user={blog.user}
      />
      <div className="mx-8 mt-4">
        <Comments blogId={id as string} parentId={null} />
      </div>
    </div>
  );
};

export default BlogsView;
