export const mfConfig = {
  name: "comments",
  filename: "remoteEntry.js",
  exposes: {
    "./comments": "./src/comment.tsx"
  },

  remotes: {
    store: "store@http://localhost:3003/remoteEntry.js", // remote name@URL
    followers: "followers@http://localhost:3200/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, eager: true }, // Make sure React is shared as a singleton
    "react-dom": { singleton: true, eager: true },
    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT
  },
};
