export const mfConfig = {
  name: "home",
  exposes: {},
  remotes: {
    store: "store@https://mfe-blog-auth.netlify.app/remoteEntry.js", // remote name@URL
    comments: "comments@https://mfe-blog-comments.netlify.app/remoteEntry.js",

  },
  shared: {
    react: { singleton: true, eager: true }, // Make sure React is shared as a singleton
    "react-dom": { singleton: true, eager: true },

    redux: { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true }, // 👈 IMPORTANT
  },
};
