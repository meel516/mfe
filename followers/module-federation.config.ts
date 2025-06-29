export const mfConfig = {
  name: "followers",
  filename: "remoteEntry.js",
  exposes: {
    "./mount": "./src/mount.ts",
  },
  remotes: {
    store: "store@http://localhost:3003/remoteEntry.js",
  },
  shared: { "react-redux": { singleton: true, eager: true } }, // 👈 IMPORTANT "react-redux": { singleton: true }, // 👈 IMPORTANT},
};
