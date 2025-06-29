import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const blogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
});

const CreateBlog = ({ mode = "create" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== "create") {
      axios
        .get(`https://nodejstarter.onrender.com/v1/blogs/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setInitialValues(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
        });
    }
  }, [id, mode]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "https://nodejstarter.onrender.com/v1/blogs/user"
          : `https://nodejstarter.onrender.com/v1/blogs/user/${id}`;

      const method = mode === "create" ? axios.post : axios.patch;

      const res = await method(url, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        navigate("/blog");
        resetForm();
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Hero Image Preview */}
      {initialValues.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12 group"
        >
          <img
            src={initialValues.image}
            alt={initialValues.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8"
      >
        {mode === "create" ? "Create New Blog" : "Edit Blog"}
      </motion.h1>

      {/* Form */}
      <div
        className="prose prose-lg prose-invert max-w-none
        prose-headings:text-gray-100
        prose-a:text-purple-400 hover:prose-a:underline
        prose-strong:text-gray-100
        prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-img:rounded-xl prose-img:shadow-lg"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={blogValidationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="font-bold">Blog Title</label>
                <Field
                  name="title"
                  type="text"
                  className={`w-full bg-white text-black px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.title && touched.title
                      ? "border-red-400 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                  placeholder="Enter your blog title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="font-bold">Blog Content</label>
                <ReactQuill
                  value={values.description}
                  onChange={(value) => setFieldValue("description", value)}
                  theme="bubble"
                  className="bg-white rounded-lg min-h-[200px]"
                  placeholder="Write your blog content here..."
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image Field */}
              <div>
                <label className="font-bold">Featured Image URL</label>
                <Field
                  name="image"
                  type="text"
                  className={`w-full bg-white text-black px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.image && touched.image
                      ? "border-red-400 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting
                    ? "Processing..."
                    : mode === "create"
                    ? "Publish Blog"
                    : "Update Blog"}
                </button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.section>
  );
};

export default CreateBlog;
