export const mfConfig = {
  name: "home",
  exposes: {},
  remotes: {
    store: "store@http://localhost:3003/remoteEntry.js", // remote name@URL
    comments: "comments@http://localhost:3100/remoteEntry.js",

  },
  shared: {
    react: { singleton: true, eager: true }, // Make sure React is shared as a singleton
    "react-dom": { singleton: true, eager: true },

    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT
  },
};
