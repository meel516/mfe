export const mfConfig = {
  name: "store",
  filename: "remoteEntry.js",
  exposes: {
    "./userActions": "./src/slices/userSlice.ts",
    "./store": "./src/Store.tsx",
    "./commentsActions": "./src/slices/commentsSlice.ts"
  },
  shared: {
    react: { singleton: true, eager: true }, // Make sure React is shared as a singleton
    "react-dom": { singleton: true, eager: true },
    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT "react-redux": { singleton: true }, // 👈 IMPORTANT
  },
};
