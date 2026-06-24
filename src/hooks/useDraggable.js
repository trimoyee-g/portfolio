import { useRef, useCallback } from "react";

export function useDraggable(id, pos, onMove, onFocus) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      // Don't drag from buttons
      if (e.target.closest("button, a, input, textarea, select, [data-no-drag]")) return;
      dragging.current = true;
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      onFocus(id);

      const onMove_ = (e) => {
        if (!dragging.current) return;
        const nx = Math.max(0, e.clientX - offset.current.x);
        const ny = Math.max(0, e.clientY - offset.current.y);
        onMove(id, nx, ny);
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove_);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove_);
      window.addEventListener("mouseup", onUp);
      e.preventDefault();
    },
    [id, pos, onMove, onFocus]
  );

  return { onMouseDown };
}
