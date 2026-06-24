import BaseDesktop from "./BaseDesktop";

function TrafficLight({ color, title, onClick }) {
  return (
    <div
      title={title}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        width: 12, height: 12, borderRadius: "50%",
        background: color,
        cursor: "pointer",
        transition: "filter 0.15s",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.2)"}
      onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
    />
  );
}

const MAC_THEME = {
  variants: {
    enter:    { scale: 0.82, opacity: 0, y: 28 },
    visible:  { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 290, damping: 22, mass: 0.85 } },
    minimize: { scaleX: 0.06, scaleY: 0.06, opacity: 0, y: 130, transition: { ease: [0.3, 0, 0.8, 0.15], duration: 0.38 } },
    close:    { scale: 0.68, opacity: 0, transition: { ease: [0.4, 0, 1, 1], duration: 0.17 } },
  },
  layoutTransition: { layout: { type: "spring", stiffness: 300, damping: 30 } },
  borderRadius: 12,
  boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)",
  background: "rgba(20,20,30,0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  titlebarHeight: 42,
  titlebarBackground: "rgba(255,255,255,0.04)",
  titlebarBorder: "1px solid rgba(255,255,255,0.08)",
  renderTitlebar: ({ id, title, icon, winState, onClose, onMinimize, onMaximize }) => (
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 14px", gap: 8 }}>
      <div style={{ display: "flex", gap: 6 }} data-no-drag>
        <TrafficLight color="#ff5f57" title="Close"    onClick={() => onClose(id)} />
        <TrafficLight color="#febc2e" title="Minimize" onClick={() => onMinimize(id)} />
        <TrafficLight color="#28c840" title={winState?.maximized ? "Restore" : "Maximize"} onClick={() => onMaximize(id)} />
      </div>
      <span style={{ marginLeft: 8, fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: 0.3, display: "flex", alignItems: "center", gap: 6 }}>
        {icon && <span>{icon}</span>}
        {title}
      </span>
    </div>
  ),
};

export default function Window(props) {
  return <BaseDesktop {...props} theme={MAC_THEME} />;
}
