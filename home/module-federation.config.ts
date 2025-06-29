export const mfConfig = {
  name: "home",
  exposes: {},
  remotes: {
    store: "store@https://mfe-blog-auth.netlify.app/remoteEntry.js", // remote name@URL
    comments: "comments@https://mfe-blog-comments.netlify.app/remoteEntry.js",

  },
  shared: {
    react: { singleton: true, requiredVersion: '>=16.8.0' },
    'react-dom': { singleton: true, requiredVersion: '>=16.8.0' },
    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT
  },
};
