import { profile } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export default function AboutWindow() {
  return (
    <div style={{ padding: 28, fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ display: "flex", gap: 22, alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 38, flexShrink: 0,
          boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
        }}>
          👩‍💻
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f0f6fc", marginBottom: 4 }}>
            {profile.name}
          </h1>
          <p style={{ color: "#818cf8", fontSize: 13, marginBottom: 8 }}>{profile.title}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill color="#56d364">✓ {profile.status}</Pill>
            <Pill color="#58a6ff">📍 {profile.location}</Pill>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Section title="HI, welcome!">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {profile.summary.map((para, i) => (
            <p key={i} style={{ color: "#a0aec0", fontSize: 14, lineHeight: 1.75 }}>{para}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <SectionHeader>{title}</SectionHeader>
      {children}
    </div>
  );
}

function Pill({ color, children }) {
  return (
    <span style={{
      background: `${color}18`, color,
      border: `1px solid ${color}44`,
      borderRadius: 20, padding: "3px 12px",
      fontSize: 11, fontWeight: 500,
    }}>
      {children}
    </span>
  );
}

