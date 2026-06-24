import { useState, useRef, useCallback } from "react";

export function useWindowManager() {
  const [windows, setWindows] = useState({});
  const zCounter = useRef(100);

  const openWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        open: true,
        minimized: false,
        zIndex: ++zCounter.current,
        x: prev[id]?.x ?? 80 + Math.random() * 60,
        y: prev[id]?.y ?? 60 + Math.random() * 40,
      },
    }));
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: ++zCounter.current },
    }));
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y },
    }));
  }, []);

  const resizeWindow = useCallback((id, w, h) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], width: w, height: h },
    }));
  }, []);

  const maximizeWindow = useCallback((id, taskbarOffset = 0) => {
    setWindows((prev) => {
      const win = prev[id] ?? {};
      if (win.maximized) {
        return {
          ...prev,
          [id]: {
            ...win,
            maximized: false,
            x: win.restoreX,
            y: win.restoreY,
            width: win.restoreWidth,
            height: win.restoreHeight,
          },
        };
      }
      return {
        ...prev,
        [id]: {
          ...win,
          maximized: true,
          restoreX: win.x,
          restoreY: win.y,
          restoreWidth: win.width,
          restoreHeight: win.height,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - taskbarOffset,
          zIndex: ++zCounter.current,
        },
      };
    });
  }, []);

  const isOpen = useCallback((id) => windows[id]?.open && !windows[id]?.minimized, [windows]);
  const isMinimized = useCallback((id) => windows[id]?.open && windows[id]?.minimized, [windows]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    maximizeWindow,
    isOpen,
    isMinimized,
  };
}
