import React, { useEffect, useRef } from "react";
import { init, loadRemote } from "@module-federation/runtime";

const Vanilla = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAndMount = async () => {
      await init({
        name: "comments", // 👈 your current app name
        remotes: [
          {
            name: "followers",
            entry: "http://localhost:3200/remoteEntry.js",
            type: "module", // or "script" if it's UMD-style
          },
        ],
      });

      const { mount } = await loadRemote("followers/mount");
      mount(containerRef.current);
    };

    loadAndMount();
  }, []);

  return <div ref={containerRef} />;
};

export default Vanilla;
