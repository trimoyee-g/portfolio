import { achievements, education, profile } from "../data/portfolio";
import linkedinLogo from "../assets/linkedinLogo.png";
import flipkartLogo from "../assets/flipkartLogo.png";
import leetCodeLogo from "../assets/leetCodeLogo.png";
import codechefLogo from "../assets/codechefLogo.png";
import { SectionHeader } from "./SectionHeader";

const ACHIEVEMENT_LOGOS = {
  "Flipkart Grid 7.0": flipkartLogo,
  "LeetCode Knight (top 3.24% globally)":          leetCodeLogo,
  "CodeChef":          codechefLogo,
};

export function AchievementsWindow() {
  return (
    <div style={{ padding: 28, fontFamily: "system-ui, sans-serif" }}>
      {achievements.map((a, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>
            {ACHIEVEMENT_LOGOS[a.title]
              ? <img src={ACHIEVEMENT_LOGOS[a.title]} alt={a.title} style={{ width: 32, height: 32, objectFit: "contain" }} />
              : a.icon
            }
          </div>
          <div>
            <div style={{ color: "#f0f6fc", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{a.title}</div>
            <div style={{ color: "#8b949e", fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</div>
            {a.skills && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {a.skills.map(skill => (
                  <span key={skill} style={{
                    background: "rgba(88,166,255,0.1)", color: "#58a6ff",
                    border: "1px solid rgba(88,166,255,0.25)",
                    borderRadius: 20, padding: "3px 10px",
                    fontSize: 11, fontWeight: 500,
                  }}>{skill}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EducationWindow() {
  return (
    <div style={{ padding: 28, fontFamily: "system-ui, sans-serif" }}>
      {education.map((e, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(86,211,100,0.12)",
            border: "1px solid rgba(86,211,100,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}>
            {e.icon}
          </div>
          <div>
            <div style={{ color: "#f0f6fc", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{e.institution}</div>
            <div style={{ color: "#56d364", fontSize: 12, marginBottom: 4 }}>{e.degree}</div>
            <div style={{ color: "#8b949e", fontSize: 11 }}>📅 {e.period} · 📍 {e.location}</div>
          </div>
        </div>
      ))}

      {/* Relevant coursework */}
      <div style={{ marginTop: 8 }}>
        <SectionHeader>Relevant Coursework</SectionHeader>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "DBMS", "OOP"].map(c => (
            <span key={c} style={{
              background: "rgba(88,166,255,0.1)", color: "#58a6ff",
              border: "1px solid rgba(88,166,255,0.25)",
              borderRadius: 6, padding: "4px 12px", fontSize: 11.5,
            }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactWindow() {
  const links = [
    { icon: "✉️",  label: "Email",    value: profile.email,    href: `mailto:${profile.email}`,      color: "#f85149" },
    { icon: "📞",  label: "Phone",    value: profile.phone,    href: `tel:${profile.phone}`,          color: "#56d364" },
    { logo: linkedinLogo,                                    label: "LinkedIn", value: profile.linkedin, href: `https://${profile.linkedin}`, color: "#58a6ff" },
    { logo: "https://cdn.simpleicons.org/github/ffffff",     label: "GitHub",   value: profile.github,   href: `https://${profile.github}`,   color: "#a371f7" },
  ];

  return (
    <div style={{ padding: 28, fontFamily: "system-ui, sans-serif" }}>
      {/* Status banner */}
      <div style={{
        background: "rgba(86,211,100,0.08)",
        border: "1px solid rgba(86,211,100,0.25)",
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 22,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#56d364",
          boxShadow: "0 0 8px #56d364",
          animation: "pulse 1.5s infinite",
          flexShrink: 0,
        }} />
        <div>
          <div style={{ color: "#56d364", fontWeight: 700, fontSize: 14 }}>Available for Hire</div>
          <div style={{ color: "#8b949e", fontSize: 12, marginTop: 2 }}>{profile.status} · {profile.location}</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: `${l.color}0f`,
              border: `1px solid ${l.color}25`,
              borderRadius: 12, padding: "14px 16px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${l.color}1e`}
            onMouseLeave={e => e.currentTarget.style.background = `${l.color}0f`}
          >
            {l.logo
              ? <img src={l.logo} alt={l.label} style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }} />
              : <span style={{ fontSize: 22 }}>{l.icon}</span>
            }
            <div>
              <div style={{ color: "#8b949e", fontSize: 10, marginBottom: 2 }}>{l.label}</div>
              <div style={{ color: l.color, fontSize: 12, fontWeight: 500 }}>{l.value}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Message */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "16px 18px",
        color: "#8b949e", fontSize: 16, lineHeight: 1.7,
        fontStyle: "italic",
      }}>
        "Drop a hi 👋 if you're building interesting things!"
      </div>
    </div>
  );
}
