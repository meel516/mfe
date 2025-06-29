import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";
import store from "store/store";
import {
  setAccessToken,
  setLoggedIn,
  setName,
  setUserId,
} from "store/userActions";
import { useDispatch, useSelector } from "react-redux";
import TechBadge from "../components/TechBadge";

const PrivarteLayout = () => {
  const accessToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  console.log(store.getState(), "saleem");
  console.log(accessToken);
  useEffect(() => {
    if (!accessToken) {
      window.location.href = "/login";
    }
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://nodejstarter.onrender.com/v1/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!res.data.success) {
          window.location.href = "/login";
        } else {
          dispatch(setAccessToken(accessToken));
          dispatch(setName(res.data.data.email));
          dispatch(setLoggedIn(true));
          dispatch(setUserId(res.data.data._id));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header />
      <section className="mt-[100px] h-[calc(100vh-100px)]">
        <Outlet />
        <TechBadge />
      </section>
    </div>
  );
};

export default PrivarteLayout;
