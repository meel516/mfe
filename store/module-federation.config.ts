export const mfConfig = {
  name: "store",
  filename: "remoteEntry.js",
  exposes: {
    "./userActions": "./src/slices/userSlice.tsx",
    "./store":"./src/Store.tsx"
  },
  shared: {
    react: { singleton: true, eager: true },  // Make sure React is shared as a singleton
    'react-dom': { singleton: true, eager: true },
  },
};
