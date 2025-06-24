import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useUserState } from "store/store";

const PrivarteLayout = () => {
  const accessToken = localStorage.getItem("token");
  const { setAccessToken, setIsLoggenedIn, setName } = useUserState();
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
          setAccessToken(accessToken);
          setName(res.data.data.email);
          setIsLoggenedIn(true);
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
