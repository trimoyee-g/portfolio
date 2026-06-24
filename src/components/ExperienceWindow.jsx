import { experience } from "../data/portfolio";

export default function ExperienceWindow() {
  return (
    <div style={{ padding: 28, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {experience.map((job, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${job.color}30`,
            borderLeft: `3px solid ${job.color}`,
            borderRadius: 12,
            padding: "18px 20px",
            position: "relative",
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div>
                  <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: 15 }}>{job.company}</div>
                  <div style={{ color: job.color, fontSize: 12, marginTop: 2 }}>{job.role}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#8b949e", fontSize: 11 }}>{job.period}</div>
                <div style={{ color: "#484f58", fontSize: 10, marginTop: 2 }}>📍 {job.location}</div>
              </div>
            </div>

            {/* Blurb */}
            {job.blurb && (
              <p style={{
                fontSize: 12.5, color: "#c9d1d9", lineHeight: 1.75,
                fontStyle: "italic", marginBottom: 12,
                borderLeft: `2px solid ${job.color}40`,
                paddingLeft: 10,
              }}>
                {job.blurb}
              </p>
            )}

            {/* Bullets */}
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: "#a0aec0", lineHeight: 1.6 }}>
                  <span style={{ color: job.color, flexShrink: 0, marginTop: 1 }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
