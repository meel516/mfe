import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiLogIn, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <motion.div
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Fc0NGxn/side-shot-code-editor-using-react-js.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="opacity-90">Join our community today</p>
        </div>

        <div className="p-8">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              try {
                const res = await axios.post(
                  "https://nodejstarter.onrender.com/v1/auth/register",
                  values
                );
                if (res.data.success) {
                  navigate("/login");
                }
              } catch (err) {
                console.error("Registration failed", err);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiUser className="h-5 w-5" />
                    </div>
                    <Field
                      name="name"
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiLock className="h-5 w-5" />
                    </div>
                    <Field
                      name="password"
                      type="password"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ${
                      isSubmitting ? "opacity-80" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <>
                        <FiUser className="mr-2" />
                        Register
                      </>
                    )}
                  </button>
                </motion.div>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <p className="flex items-center justify-center gap-1">
                    Already have an account?
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                    >
                      Sign in now
                      <FiArrowRight className="inline" />
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
