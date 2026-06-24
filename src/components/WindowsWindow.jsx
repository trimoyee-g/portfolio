import BaseDesktop from "./BaseDesktop";

const EASE_ENTER = [0.1, 0.9, 0.2, 1];
const EASE_EXIT  = [0.7, 0, 1, 0.5];

function WinButton({ label, title, isClose, onClick }) {
  return (
    <div
      title={title}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        width: 46,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 12,
        color: "rgba(255,255,255,0.55)",
        transition: "background 0.12s, color 0.12s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isClose ? "rgba(196,43,28,0.85)" : "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgba(255,255,255,0.95)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.55)";
      }}
    >
      {label}
    </div>
  );
}

const WIN_THEME = {
  variants: {
    enter:    { scale: 0.9,  opacity: 0, y: 28 },
    visible:  { scale: 1,    opacity: 1, y: 0,  transition: { ease: EASE_ENTER, duration: 0.22 } },
    minimize: { scale: 0.78, opacity: 0, y: 90, transition: { ease: EASE_EXIT,  duration: 0.2  } },
    close:    { scale: 0.94, opacity: 0, y: 0,  transition: { ease: EASE_EXIT,  duration: 0.15 } },
  },
  layoutTransition: { layout: { type: "tween", ease: [0.2, 0, 0, 1], duration: 0.25 } },
  borderRadius: 8,
  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
  background: "rgba(18,22,32,0.94)",
  border: "1px solid rgba(255,255,255,0.08)",
  titlebarHeight: 40,
  titlebarBackground: "rgba(255,255,255,0.03)",
  titlebarBorder: "1px solid rgba(255,255,255,0.06)",
  renderTitlebar: ({ id, title, icon, winState, onClose, onMinimize, onMaximize }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
      <span style={{
        paddingLeft: 12,
        fontSize: 12.5,
        color: "rgba(255,255,255,0.65)",
        display: "flex",
        alignItems: "center",
        gap: 7,
        letterSpacing: 0.2,
      }}>
        {icon && <span style={{ fontSize: 15 }}>{icon}</span>}
        {title}
      </span>
      <div style={{ display: "flex", height: "100%" }} data-no-drag>
        <WinButton label="─"  title="Minimize"                                   onClick={() => onMinimize(id)} />
        <WinButton label={winState?.maximized ? "❐" : "□"} title={winState?.maximized ? "Restore" : "Maximize"} onClick={() => onMaximize(id)} />
        <WinButton label="✕"  title="Close"   isClose                            onClick={() => onClose(id)} />
      </div>
    </div>
  ),
};

export default function WindowsWindow(props) {
  return <BaseDesktop {...props} theme={WIN_THEME} />;
}
