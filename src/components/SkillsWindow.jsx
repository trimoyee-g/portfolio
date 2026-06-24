import { skills } from "../data/portfolio";

const CATEGORY_COLORS = {
  "Languages":          "#58a6ff",
  "Frameworks":         "#a371f7",
  "Distributed Systems":"#e3b341",
  "Databases":          "#56d364",
  "DevOps & Tools":     "#f85149",
  "AI / ML":            "#f0a8d0",
};

export default function SkillsWindow() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {Object.entries(skills).map(([cat, items]) => {
          const color = CATEGORY_COLORS[cat] || "#58a6ff";
          return (
            <div key={cat} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${color}25`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{
                fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase",
                color, fontWeight: 600, marginBottom: 12,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                {cat}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map((skill) => (
                  <span key={skill} style={{
                    background: `${color}12`,
                    color: "#c9d1d9",
                    border: `1px solid ${color}25`,
                    borderRadius: 6, padding: "4px 10px",
                    fontSize: 11.5, fontWeight: 500,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${color}28`;
                      e.currentTarget.style.color = color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${color}12`;
                      e.currentTarget.style.color = "#c9d1d9";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
