import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/userActions";

const Header = () => {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDetails = useSelector((state) => state.user);
  const totalState = useSelector((state) => state);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(user, totalState, "what is user");
  const handleLogout = () => {
    // Clear user state, tokens, or whatever logout involves
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <span
        onClick={() => navigate("/")}
        className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
      >
        📝 Blogs
      </span>

      {isLoggedIn ? (
        <div
          className="relative flex items-center gap-3 text-gray-700"
          ref={dropdownRef}
        >
          <span className="font-medium">{user}</span>

          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center uppercase font-bold cursor-pointer"
          >
            {user?.[0] || "U"}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-14 bg-white border rounded-md shadow-lg w-40 py-2 z-50">
              <button
                onClick={() => {
                  navigate("/user");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <nav>
          <Link
            to="/login"
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Login
          </Link>
        </nav>
      )}
    </nav>
  );
};

export default Header;
