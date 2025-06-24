export const mfConfig = {
  name: "store",
  filename: "remoteEntry.js",
  exposes: {
    "./store": "./src/Store.tsx",
  },
  shared: ["react", "react-dom"],
};
