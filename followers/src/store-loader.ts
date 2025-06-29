import { init, loadRemote } from "@module-federation/runtime";

let storeInstance: any;

export const loadSharedStore = async () => {
  if (storeInstance) return storeInstance;

  await init({
    name: "followers", // ✅ Required field (your current app name)
    remotes: [
      {
        name: "store",
        entry: "http://localhost:3003/remoteEntry.js",
      },
    ],
  });

  const storeModule = await loadRemote("store/store") as any;
  storeInstance = storeModule.default;

  return storeInstance;
};
