// loadSharedStore.js
import { init, loadRemote } from "@module-federation/runtime";

let store;

export const loadSharedStore = async () => {
  if (store) return store;

  await init({
    remote: {
      store: "http://localhost:3003/remoteEntry.js",
    },
  });

  store = await loadRemote("store/store");
  return store; // ✅ contains state$ and increment
};
