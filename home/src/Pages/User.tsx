import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";

const User = () => {
  const [initialValues, setInitialValues] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "https://i.pravatar.cc/150?img=3", // optional avatar
  });

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center gap-10">
        {/* Profile Picture */}
        <div className="flex-shrink-0 text-center md:text-left">
          {initialValues.profilePic ? (
            <img
              src={initialValues.profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-md border-2 border-indigo-500"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white shadow-md border-2 border-indigo-500">
              {initialValues.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="mt-4 text-gray-700">
            <p className="text-xl font-semibold">{initialValues.name}</p>
            <p className="text-sm text-gray-500">{initialValues.email}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            User Profile
          </h2>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await axios.patch(
                "https://nodejstarter.onrender.com/v1/users/user",
                values,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            }}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-6">
                {/* Name - Editable */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Name</span>
                  <Field
                    name="name"
                    className="text-lg font-medium text-gray-900 bg-transparent focus:outline-none border-b border-gray-300 focus:border-indigo-500 py-1"
                  />
                </div>

                {/* Email - Read Only */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Email</span>
                  <Field
                    name="email"
                    disabled
                    className="text-lg font-medium text-gray-500 bg-gray-100 px-3 py-2 rounded-md cursor-not-allowed"
                  />
                </div>

                {/* Followers / Following */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="bg-indigo-50 p-4 rounded-lg shadow-inner text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {initialValues.followers || 0}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg shadow-inner text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {initialValues.following || 0}
                    </div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    Update Profile
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default User;
