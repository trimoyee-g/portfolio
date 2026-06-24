import { useState, useCallback } from "react";
import { useWindowManager } from "./hooks/useWindowManager";
import { detectOS } from "./hooks/useOS";
import { useIsMobile } from "./hooks/useIsMobile";
import MobileApp from "./components/MobileApp";
import Wallpaper from "./components/Wallpaper";
import WindowsWallpaper from "./components/WindowsWallpaper";
import DesktopIcons from "./components/DesktopIcons";
import Taskbar from "./components/Taskbar";
import WindowsTaskbar from "./components/WindowsTaskbar";
import Window from "./components/Window";
import WindowsWindow from "./components/WindowsWindow";
import ContextMenu from "./components/ContextMenu";
import AboutWindow from "./components/AboutWindow";
import ExperienceWindow from "./components/ExperienceWindow";
import ProjectsWindow from "./components/ProjectsWindow";
import SkillsWindow from "./components/SkillsWindow";
import TerminalWindow from "./components/TerminalWindow";
import { AchievementsWindow, EducationWindow, ContactWindow } from "./components/OtherWindows";

const WIN_CONFIG = {
  about:        { title: "About Me",      icon: "👤", width: 580, height: 520, component: AboutWindow },
  experience:   { title: "Experience",    icon: "💼", width: 640, height: 500, component: ExperienceWindow },
  projects:     { title: "Projects",      icon: "📁", width: 700, height: 520, component: ProjectsWindow },
  skills:       { title: "Skills",        icon: "⚡", width: 660, height: 560, component: SkillsWindow },
  achievements: { title: "Achievements",  icon: "🏆", width: 500, height: 380, component: AchievementsWindow },
  education:    { title: "Education",     icon: "🎓", width: 500, height: 400, component: EducationWindow },
  terminal:     { title: "tri@portfolio — bash", icon: "🖥️", width: 580, height: 380, component: TerminalWindow },
  contact:      { title: "Contact",       icon: "📬", width: 500, height: 450, component: ContactWindow },
};

const ALL_IDS = Object.keys(WIN_CONFIG);

export default function App() {
  const isMobile = useIsMobile();
  const wm = useWindowManager();
  const [ctxMenu, setCtxMenu] = useState(null);
  const [os, setOs] = useState(() => detectOS());
  const isWindows = os === "windows";
  const WinComp = isWindows ? WindowsWindow : Window;

  const switchOS = () => {
    const next = isWindows ? "mac" : "windows";
    const params = new URLSearchParams(window.location.search);
    params.set("os", next);
    window.history.replaceState(null, "", "?" + params.toString());
    setOs(next);
  };

  if (isMobile) return <MobileApp />;

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMaximize = useCallback((id) => {
    wm.maximizeWindow(id, isWindows ? 48 : 0);
  }, [isWindows, wm.maximizeWindow]);

  const openAll = () => ALL_IDS.forEach((id) => wm.openWindow(id));
  const closeAll = () => ALL_IDS.forEach((id) => wm.closeWindow(id));

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", userSelect: "none" }}
      onContextMenu={handleContextMenu}
    >
      {/* Layer 0: wallpaper */}
      {isWindows ? <WindowsWallpaper /> : <Wallpaper />}

      {/* Layer 1: desktop icons */}
      <DesktopIcons onOpen={wm.openWindow} />

      {/* Layer 2: windows */}
      {ALL_IDS.map((id) => {
        const cfg = WIN_CONFIG[id];
        const Comp = cfg.component;
        return (
          <WinComp
            key={id}
            id={id}
            title={cfg.title}
            icon={cfg.icon}
            winState={wm.windows[id]}
            onClose={wm.closeWindow}
            onMinimize={wm.minimizeWindow}
            onMaximize={handleMaximize}
            onFocus={wm.focusWindow}
            onMove={wm.moveWindow}
            defaultWidth={cfg.width}
            defaultHeight={cfg.height}
          >
            <Comp />
          </WinComp>
        );
      })}

      {/* Layer 3: taskbar */}
      {isWindows ? (
        <WindowsTaskbar
          windows={wm.windows}
          onOpen={wm.openWindow}
          onMinimize={wm.minimizeWindow}
          isOpen={wm.isOpen}
          isMinimized={wm.isMinimized}
        />
      ) : (
        <Taskbar
          windows={wm.windows}
          onOpen={wm.openWindow}
          onMinimize={wm.minimizeWindow}
          isOpen={wm.isOpen}
          isMinimized={wm.isMinimized}
        />
      )}

      {/* Context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          onOpenAll={openAll}
          onCloseAll={closeAll}
        />
      )}

      {/* Boot hint */}
      <div style={{
        position: "fixed", bottom: isWindows ? 56 : 80, right: 22,
        color: "rgba(255,255,255,0.25)", fontSize: 11,
        fontFamily: "system-ui, sans-serif",
        pointerEvents: "none",
      }}>
        Double-click icons · Right-click desktop
      </div>

      {/* OS switch */}
      <button
        onClick={switchOS}
        style={{
          position: "fixed", bottom: isWindows ? 56 : 80, left: 22,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8, padding: "5px 12px",
          color: "rgba(255,255,255,0.45)", fontSize: 11,
          fontFamily: "system-ui, sans-serif",
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
      >
        {isWindows ? "Not on Windows? Switch to macOS" : "Not on Mac? Switch to Windows"}
      </button>
    </div>
  );
}
