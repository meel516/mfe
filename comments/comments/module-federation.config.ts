export const mfConfig = {
  name: "comments",
  filename: "remoteEntry.js",
  exposes: {
    "./comments": "./src/Comment.tsx"
  },

  remotes: {
    store: "store@https://mfe-blog-auth.netlify.app/remoteEntry.js", // remote name@URL
    followers: "followers@http://localhost:3200/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: '>=16.8.0' },
    'react-dom': { singleton: true, requiredVersion: '>=16.8.0' },
    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT
  },
};
