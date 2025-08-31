import { useCallback, useEffect, useState } from "react";

export default function useFullscreen() {
  const [isFs, setIsFs] = useState(
    Boolean(
      JSON.parse(localStorage.getItem("apex.settings") || "{}")?.fullscreen
    )
  );

  const enter = useCallback(async () => {
    await document.documentElement.requestFullscreen?.();
    setIsFs(true);
    persist(true);
  }, []);

  const exit = useCallback(async () => {
    await document.exitFullscreen?.();
    setIsFs(false);
    persist(false);
  }, []);

  function persist(fullscreen) {
    const key = "apex.settings";
    const prev = JSON.parse(localStorage.getItem(key) || "{}");
    localStorage.setItem(key, JSON.stringify({ ...prev, fullscreen }));
  }

  useEffect(() => {
    function onChange() {
      const f = Boolean(document.fullscreenElement);
      setIsFs(f);
      persist(f);
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return { isFs, enter, exit };
}
