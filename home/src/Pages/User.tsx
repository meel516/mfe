import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit2, FiCheck, FiX, FiMail, FiUsers } from "react-icons/fi";

const UserProfile = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    followers: 0,
    following: 0,
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://nodejstarter.onrender.com/v1/users/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setInitialValues(res.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const res = await axios.patch(
        "https://nodejstarter.onrender.com/v1/users/user",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setInitialValues(res.data.data);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">User Profile</h1>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    form="profileForm"
                    className="flex items-center bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                  >
                    <FiCheck className="mr-1" /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center bg-white text-gray-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                  >
                    <FiX className="mr-1" /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                >
                  <FiEdit2 className="mr-1" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values }) => (
                <Form id="profileForm" className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Field
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md">
                        {values.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                      <FiMail className="text-gray-400 mr-2" />
                      {values.email}
                    </div>
                  </div>

                  {/* Bio Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {isEditing ? (
                      <Field
                        as="textarea"
                        name="bio"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md whitespace-pre-line">
                        {values.bio || "No bio yet"}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-indigo-600">
                        {values.followers || 0}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center justify-center">
                        <FiUsers className="mr-1" /> Followers
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-indigo-600">
                        {values.following || 0}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center justify-center">
                        <FiUsers className="mr-1" /> Following
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
