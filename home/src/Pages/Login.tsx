import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useUserState } from "store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLoggenedIn, setName, setAccessToken } = useUserState();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            console.log("Form data", values);
            try {
              const res = await axios.post(
                "https://nodejstarter.onrender.com/v1/auth/login",
                values
              );
              if (res.data.success) {
                localStorage.setItem("token", res.data.data.accessToken);
                setIsLoggenedIn(true);
                setName(values.email);
                navigate("/user");
                setAccessToken(res.data.data.accessToken);
              }
            } catch (err) {}
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              {/* <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
