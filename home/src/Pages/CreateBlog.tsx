import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Validation Schema
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
  useEffect(() => {
    if (mode != "create") {
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
  }, [id]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          ${mode === "create" ? "Create" : "Update"} a Blog
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={blogValidationSchema}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            try {
              let res;
              if (mode === "create") {
                res = await axios.post(
                  "https://nodejstarter.onrender.com/v1/blogs/user",
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
              } else {
                res = await axios.patch(
                  `https://nodejstarter.onrender.com/v1/blogs/user/${id}`,
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
              }
              if (res.data.success) {
                console.log("Blog created:", res.data.data);
                navigate("/blog");

                resetForm();
              }
            } catch (err) {
              console.error("Error creating blog:", err);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* Title Field */}
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <Field
                  name="title"
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description Field (ReactQuill) */}
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <ReactQuill
                  value={values.description}
                  onChange={(value) => setFieldValue("description", value)}
                  className="bg-white"
                  theme="snow"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image Field */}
              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <Field
                  name="image"
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste image link"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  {mode == "create" ? "Create" : "Update"} Blog
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateBlog;
