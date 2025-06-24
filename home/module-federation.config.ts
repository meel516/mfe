export const mfConfig = {
  name: "home",
  exposes: {},
  remotes: {
    store: "store@http://localhost:3003/remoteEntry.js", // remote name@URL
  },
  shared: ["react", "react-dom"],
};
