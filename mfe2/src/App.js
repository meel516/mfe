import React from "react";

const App = ({ carts, setCarts }) => {
  const handleDeleteCart = (index) => {
    setCarts(carts.filter((_, i) => i !== index));
  };
  return (
    <div>
      <h1>Cart</h1>
      <div className="flex gap-2 bg-gray-200 flex-col">
        {carts?.map((cart) => (
          <div className="flex gap-2">
            <p>{cart.name}</p>
            <p>{cart.price}</p>
            <button onClick={() => handleDeleteCart(carts.indexOf(cart))}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
