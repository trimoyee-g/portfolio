import { motion, AnimatePresence } from "framer-motion";
import { useDraggable } from "../hooks/useDraggable";

/**
 * Shared window shell used by both OS themes.
 *
 * theme shape:
 *   variants          – framer-motion animation variants (enter/visible/minimize/close)
 *   layoutTransition  – framer-motion transition for layout animations
 *   borderRadius      – number, applied when not maximized
 *   boxShadow         – string
 *   background        – string
 *   border            – string
 *   titlebarHeight    – number (px)
 *   titlebarBackground – string
 *   titlebarBorder    – string (css border-bottom value)
 *   renderTitlebar    – ({ id, title, icon, winState, onClose, onMinimize, onMaximize }) => JSX
 */
export default function BaseDesktop({
  id,
  title,
  icon,
  children,
  winState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  defaultWidth = 680,
  defaultHeight = 480,
  theme,
}) {
  const pos = { x: winState?.x ?? 120, y: winState?.y ?? 80 };
  const zIndex = winState?.zIndex ?? 100;
  const width = winState?.width ?? defaultWidth;
  const height = winState?.height ?? defaultHeight;

  const { onMouseDown } = useDraggable(id, pos, onMove, onFocus);
  const isVisible = winState?.open && !winState?.minimized;
  const exitVariant = winState?.minimized ? "minimize" : "close";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          layout
          variants={theme.variants}
          initial="enter"
          animate="visible"
          exit={exitVariant}
          transition={theme.layoutTransition}
          onClick={() => onFocus(id)}
          style={{
            transformOrigin: "bottom center",
            position: "fixed",
            left: pos.x,
            top: pos.y,
            width,
            height,
            zIndex,
            display: "flex",
            flexDirection: "column",
            borderRadius: winState?.maximized ? 0 : theme.borderRadius,
            overflow: "hidden",
            boxShadow: theme.boxShadow,
            background: theme.background,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: theme.border,
          }}
        >
          {/* Titlebar — layout delegated to renderTitlebar */}
          <div
            onMouseDown={winState?.maximized ? undefined : onMouseDown}
            style={{
              height: theme.titlebarHeight,
              background: theme.titlebarBackground,
              borderBottom: theme.titlebarBorder,
              cursor: "default",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            {theme.renderTitlebar({ id, title, icon, winState, onClose, onMinimize, onMaximize })}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
