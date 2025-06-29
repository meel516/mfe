export const mfConfig = {
  name: "store",
  filename: "remoteEntry.js",
  exposes: {
    "./userActions": "./src/slices/userSlice.ts",
    "./store": "./src/Store.tsx",
    "./commentsActions": "./src/slices/commentsSlice.ts"
  },
  shared: {
    react: { singleton: true, requiredVersion: '>=16.8.0' },
    'react-dom': { singleton: true, requiredVersion: '>=16.8.0' },
    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT "react-redux": { singleton: true }, // 👈 IMPORTANT
  },
};
