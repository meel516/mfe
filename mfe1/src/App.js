import React, { Suspense, useState } from "react";
// const RemoteApp = React.lazy(() => import("app2/App"));
import RemoteApp from "app2/App";

const App = () => {
  const [carts, setCarts] = useState([
    {
      name: "Product 1",
      price: "100",
    },
    {
      name: "Product 2",
      price: "200",
    },
  ]);
  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>Product Listing</h1>
      </div>
      {/* <Suspense fallback={"loading..."}> */}
      <RemoteApp carts={carts} setCarts={setCarts} />
      {/* </Suspense> */}
    </div>
  );
};

export default App;
