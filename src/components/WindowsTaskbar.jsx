import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { desktopItems } from "../data/portfolio";

export default function WindowsTaskbar({ windows, onOpen, onMinimize, isOpen, isMinimized }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: 48,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      background: "rgba(18,20,28,0.88)",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.35)",
    }}>
      {/* Centered app icons */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}>
        {desktopItems.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            active={isOpen(item.id)}
            minimized={isMinimized(item.id)}
            onClick={() => {
              if (isOpen(item.id)) onMinimize(item.id);
              else onOpen(item.id);
            }}
          />
        ))}
      </div>

      {/* System tray clock */}
      <div style={{
        paddingRight: 16,
        textAlign: "right",
        color: "rgba(255,255,255,0.75)",
        fontSize: 11,
        lineHeight: 1.4,
        flexShrink: 0,
        cursor: "default",
        userSelect: "none",
      }}>
        <div style={{ fontWeight: 500 }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div style={{ opacity: 0.5, fontSize: 10 }}>
          {time.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}


function TaskItem({ item, active, minimized, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(30,30,40,0.95)",
            color: "#fff",
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            zIndex: 10000,
          }}
        >
          {item.label}
        </motion.div>
      )}

      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          background: active
            ? "rgba(0,150,220,0.2)"
            : hovered
            ? "rgba(255,255,255,0.08)"
            : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 20,
          transition: "background 0.12s",
          position: "relative",
        }}
      >
        {item.icon}
        {(active || minimized) && (
          <div style={{
            position: "absolute",
            bottom: 3,
            left: "50%",
            transform: "translateX(-50%)",
            width: active ? 20 : 6,
            height: 2,
            borderRadius: 1,
            background: active ? "#0096dc" : "rgba(255,255,255,0.3)",
            transition: "width 0.15s",
          }} />
        )}
      </div>
    </div>
  );
}
