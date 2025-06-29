import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { state$ } from "store/store";

const Comments = () => {
  console.log(store.getState(), "saleem");
  const [name, setName] = useState("user");
  // useEffect(() => {
  //   store?.subscribe(() => {
  //     setName(store.getState().user.name);
  //   });
  // }, [store]);

  return (
    <div>
      user ID in the store is {JSON.stringify(store.getState().user)}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            store.dispatch({
              type: "user/setName",
              payload: "saleem",
            });
            console.log(store.getState(), "saleem");
          }}
        >
          click me to change state
        </button>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default Comments;
