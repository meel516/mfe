import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./api/axiosSetup.js";
import { ToastContainer } from "react-toastify";
import Index from "./Routes/Index.jsx";
import { init, loadRemote } from "@module-federation/runtime";

const App = () => {
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        await init({
          remotes: [
            {
              store: "store@https://mfe-blog-auth.netlify.app/remoteEntry.js",
              userActions:
                "store@https://mfe-blog-auth.netlify.app/remoteEntry.js",
              comments: "comments@http://localhost:3100/remoteEntry.js",
            },
          ],
        });

        const remoteStore = await loadRemote("store/store"); // 🔁 remote exposes './store'
        setStore(() => remoteStore.default); // Set the actual Redux store
      } catch (err) {
        console.error("❌ Failed to load remote store:", err);
        // Optionally use a local fallback store
        // setStore(() => fallbackStore);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, []);

  if (loading) return <div>⏳ Loading store...</div>;
  if (!store) return <div>❌ Store not available</div>;

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
