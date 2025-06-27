import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { setAccessToken, setIsLoggenedIn, setName } from "store/userActions";
import {useDispatch,useSelector} from "react-redux"

const PrivarteLayout = () => {
  const accessToken = localStorage.getItem("token");
const dispatch =useDispatch()
  const [loading, setLoading] = React.useState(false);

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
          dispatch(setIsLoggenedIn(true));
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
      </section>
    </div>
  );
};

export default PrivarteLayout;
