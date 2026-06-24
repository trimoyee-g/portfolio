import { motion } from "framer-motion";
import { desktopItems } from "../data/portfolio";

export default function DesktopIcons({ onOpen }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 18,
        top: 18,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        zIndex: 10,
      }}
    >
      {desktopItems.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
          onDoubleClick={() => onOpen(item.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: 10,
            userSelect: "none",
            width: 72,
          }}
          whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.94 }}
        >
          <span style={{ fontSize: 30, lineHeight: 1 }}>{item.icon}</span>
          <span
            style={{
              fontSize: 10.5,
              color: "#fff",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              lineHeight: 1.25,
              fontWeight: 500,
            }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
