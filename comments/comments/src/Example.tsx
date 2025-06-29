import axios from "axios";
import React, { useEffect, useState } from "react";
// import { state$, increment } from "store/store"; // Module Federation remote
import store from "store/store";
import { setName } from "store/userActions";
import Comment from "./Comment";
// import { loadSharedStore } from "./utils/loadSharedStore.js";
const Example = () => {
  const [state, setState] = useState(null);
  const [name, setlocalName] = useState("saleem");
  const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   let sub;
  //   loadSharedStore().then(({ state$ }) => {
  //     sub = state$.subscribe((state) => setCounter(state.count));
  //   });

  //   return () => sub?.unsubscribe();
  // }, []);
  //   useEffect(() => {
  //     const subscription = state$.subscribe((state) => {
  //       setCounter(state.count); // ✅ FIXED
  //     });

  //     return () => subscription.unsubscribe();
  //   }, []);
  //redux
  useEffect(() => {
    // Subscribe to store updates
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
      // setName(store.getState().user.name);
    });

    // Cleanup
    return () => unsubscribe();
  }, [store]);
  useEffect(() => {
    axios
      .get("http://localhost:8002/v1/comments/saleem", {
        headers: {
          Authorization: `Bearer ${store.getState().user.accessToken}`,
        },
      })
      .then((res) => setComments(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const handleLogin = () => {
    store.dispatch(setName(name));
  };
  console.log(store.getState(), "saleem");
  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setlocalName(e.target.value)}
        />
      </div>
      <div>my state from redux is {JSON.stringify(state)}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        change State
      </button>
      <Comment />
    </div>
  );
};

export default Example;
