import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContextMenu({ x, y, onClose, onOpenAll, onCloseAll }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const items = [
    { label: "Open All Windows", action: onOpenAll },
    { label: "Close All Windows", action: onCloseAll },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.92, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.12 }}
        style={{
          position: "fixed",
          left: x, top: y,
          zIndex: 99999,
          background: "rgba(28,28,40,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          padding: "6px",
          minWidth: 190,
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}
      >
        {items.map((item, i) =>
          item === null ? (
            <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
          ) : (
            <div
              key={i}
              onClick={() => { item.action?.(); onClose(); }}
              style={{
                padding: "7px 14px",
                borderRadius: 7,
                fontSize: 12.5,
                color: "#c9d1d9",
                cursor: "pointer",
                transition: "background 0.12s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {item.label}
            </div>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
