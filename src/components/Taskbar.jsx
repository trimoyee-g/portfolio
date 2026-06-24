import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { desktopItems } from "../data/portfolio";

export default function Taskbar({ windows, onOpen, onMinimize, isOpen, isMinimized }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(30,30,44,0.72)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 18,
        padding: "8px 14px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
      }}
    >
      {desktopItems.map((item) => {
        const active = isOpen(item.id);
        const minimized = isMinimized(item.id);
        return (
          <DockItem
            key={item.id}
            item={item}
            active={active}
            minimized={minimized}
            onClick={() => {
              if (active) onMinimize(item.id);
              else onOpen(item.id);
            }}
          />
        );
      })}

      {/* Divider */}
      <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />

      {/* Clock */}
      <div style={{ textAlign: "right", color: "rgba(255,255,255,0.8)", fontSize: 11, lineHeight: 1.4, padding: "0 4px" }}>
        <div style={{ fontWeight: 600 }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div style={{ opacity: 0.6, fontSize: 10 }}>
          {time.toLocaleDateString([], { month: "short", day: "numeric" })}
        </div>
      </div>
    </div>
  );
}

function DockItem({ item, active, minimized, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            background: "rgba(20,20,30,0.9)",
            color: "#fff",
            fontSize: 11,
            padding: "3px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {item.label}
        </motion.div>
      )}

      <motion.div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.28, y: -6 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: active
            ? "rgba(99,102,241,0.35)"
            : minimized
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.06)",
          border: active
            ? "1px solid rgba(99,102,241,0.6)"
            : "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 22,
        }}
      >
        {item.icon}
      </motion.div>

      {/* Active dot */}
      {(active || minimized) && (
        <div style={{
          width: 4, height: 4, borderRadius: "50%",
          background: active ? "#818cf8" : "rgba(255,255,255,0.3)",
          marginTop: 3,
          position: "absolute",
          bottom: -7,
        }} />
      )}
    </div>
  );
}
