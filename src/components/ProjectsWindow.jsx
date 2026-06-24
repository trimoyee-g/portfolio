import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export default function ProjectsWindow() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const proj = projects[active];

  const switchProject = (i) => {
    setActive(i);
    setExpanded(false);
  };

  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: 160,
        borderRight: "1px solid rgba(255,255,255,0.07)",
        padding: "14px 10px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}>
        <div style={{ fontSize: 9, letterSpacing: 1.5, color: "#484f58", textTransform: "uppercase", padding: "0 8px", marginBottom: 6 }}>
          Projects
        </div>
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => switchProject(i)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 10px", borderRadius: 8, cursor: "pointer",
              background: active === i ? `${p.color}18` : "transparent",
              border: active === i ? `1px solid ${p.color}30` : "1px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 18 }}>{p.icon}</span>
            <div style={{ fontSize: 12, color: active === i ? "#f0f6fc" : "#8b949e", fontWeight: active === i ? 600 : 400 }}>
              {p.name}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 22, overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `${proj.color}20`,
            border: `1px solid ${proj.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}>
            {proj.icon}
          </div>
          <div>
            <h2 style={{ color: "#f0f6fc", fontSize: 20, fontWeight: 700, marginBottom: 3 }}>{proj.name}</h2>
            <p style={{ color: proj.color, fontSize: 12 }}>{proj.tagline}</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {proj.stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "10px 12px", textAlign: "center",
            }}>
              <div style={{ color: proj.color, fontSize: 18, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: "#8b949e", fontSize: 10, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Blurb */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader>About</SectionHeader>
          <p style={{
            fontSize: 13, color: "#c9d1d9", lineHeight: 1.75,
            fontStyle: "italic",
          }}>
            {proj.blurb}
          </p>
        </div>

        {/* Read More toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: proj.color, fontSize: 12, fontWeight: 600,
            padding: "4px 0", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <motion.span
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{ display: "inline-block", fontSize: 10 }}
          >
            ▶
          </motion.span>
          {expanded ? "Show less" : "Read more"}
        </button>

        {/* STAR section */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="star"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
              style={{ overflow: "hidden", marginBottom: 20 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 4 }}>
                <StarBlock label="S — Situation" color={proj.color} text={proj.star.situation} />
                <StarBlock label="T — Task" color={proj.color} text={proj.star.task} />
                <div>
                  <StarLabel label="A — Action" color={proj.color} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {proj.star.action.map((point, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        fontSize: 12.5, color: "#a0aec0", lineHeight: 1.7,
                      }}>
                        <span style={{ color: proj.color, marginTop: 3, flexShrink: 0, fontSize: 10 }}>◆</span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
                <StarBlock label="R — Result" color={proj.color} text={proj.star.result} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Stack */}
        <div style={{ marginBottom: 18 }}>
          <SectionHeader>Tech Stack</SectionHeader>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {proj.stack.map((t) => (
              <span key={t} style={{
                background: `${proj.color}12`,
                color: proj.color,
                border: `1px solid ${proj.color}30`,
                borderRadius: 6, padding: "3px 10px",
                fontSize: 11, fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          <LinkBtn href={`https://${proj.github}`} label="🐙 GitHub" color={proj.color} />
          {proj.demo && <LinkBtn href={`https://${proj.demo}`} label="🚀 Live Demo" color={proj.color} />}
        </div>
      </div>
    </div>
  );
}


function StarLabel({ label, color }) {
  return (
    <span style={{
      fontSize: 9, letterSpacing: 1.2, textTransform: "uppercase",
      color, fontWeight: 700, opacity: 0.8,
    }}>
      {label}
    </span>
  );
}

function StarBlock({ label, color, text }) {
  return (
    <div>
      <StarLabel label={label} color={color} />
      <p style={{
        fontSize: 12.5, color: "#a0aec0", lineHeight: 1.75,
        marginTop: 6,
        borderLeft: `2px solid ${color}40`,
        paddingLeft: 12,
      }}>
        {text}
      </p>
    </div>
  );
}

function LinkBtn({ href, label, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex", alignItems: "center",
        background: `${color}15`, color,
        border: `1px solid ${color}40`,
        borderRadius: 8, padding: "7px 16px",
        fontSize: 12, textDecoration: "none",
        fontWeight: 500, transition: "background 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = `${color}28`}
      onMouseLeave={e => e.currentTarget.style.background = `${color}15`}
    >
      {label}
    </a>
  );
}
