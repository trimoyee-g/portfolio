import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, experience, projects, skills, achievements, education } from "../data/portfolio";
import linkedinLogo from "../assets/linkedinLogo.png";
import flipkartLogo from "../assets/flipkartLogo.png";

const ACHIEVEMENT_LOGOS = {
  "Flipkart Grid 7.0": flipkartLogo,
};
import Wallpaper from "./Wallpaper";

const TABS = [
  { id: "about",      icon: "👤", label: "About"      },
  { id: "experience", icon: "💼", label: "Experience"  },
  { id: "projects",   icon: "📁", label: "Projects"    },
  { id: "skills",     icon: "⚡", label: "Skills"      },
  { id: "more",       icon: "✦",  label: "More"        },
];

const NAV_H = 62;

export default function MobileApp() {
  const [tab, setTab] = useState("about");

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      position: "relative", fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <Wallpaper />

      {/* Scrollable content */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        bottom: NAV_H, overflowY: "auto", overflowX: "hidden", zIndex: 1,
      }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          >
            {tab === "about"      && <AboutSection />}
            {tab === "experience" && <ExperienceSection />}
            {tab === "projects"   && <ProjectsSection />}
            {tab === "skills"     && <SkillsSection />}
            {tab === "more"       && <MoreSection />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: NAV_H,
        background: "rgba(18,20,28,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
        zIndex: 9999,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, border: "none", background: "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 3, cursor: "pointer", padding: "8px 0",
              color: tab === t.id ? "#818cf8" : "rgba(255,255,255,0.35)",
              transition: "color 0.15s",
            }}
          >
            <span style={{ fontSize: 19 }}>{t.icon}</span>
            <span style={{ fontSize: 9.5, fontWeight: tab === t.id ? 600 : 400, letterSpacing: 0.3 }}>
              {t.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <div style={{ padding: "28px 18px 20px" }}>
      <SlideItem index={0}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
            }}>
              👤
            </div>
            <div>
              <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{profile.name}</div>
              <div style={{ color: "#8b949e", fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{profile.title}</div>
            </div>
          </div>

          <div style={{
            background: "rgba(86,211,100,0.1)", border: "1px solid rgba(86,211,100,0.3)",
            borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#56d364", display: "inline-block" }} />
            <span style={{ color: "#56d364", fontSize: 11, fontWeight: 600 }}>{profile.status}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {profile.summary.map((para, i) => (
              <p key={i} style={{ color: "#a0aec0", fontSize: 12.5, lineHeight: 1.75 }}>{para}</p>
            ))}
          </div>
        </Card>
      </SlideItem>

      <SlideItem index={2}>
        <div style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: 12, padding: "14px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>📄</span>
            <div>
              <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: 13 }}>Resume</div>
              {/* <div style={{ color: "#8b949e", fontSize: 11, marginTop: 1 }}>Trimoyee Ghosh · PDF</div> */}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="https://drive.google.com/file/d/15_gY0uMrYDfHCTS7FvqsDCcWs7Cg00Jj/view?usp=sharing" target="_blank" rel="noreferrer" style={{
              flex: 1, textAlign: "center",
              background: "rgba(99,102,241,0.18)", color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 8, padding: "9px 0",
              fontSize: 12.5, textDecoration: "none", fontWeight: 600,
            }}>
              👁 View
            </a>
            <a href="/Trimoyee_Ghosh_Resume.pdf" download="Trimoyee_Ghosh_Resume.pdf" style={{
              flex: 1, textAlign: "center",
              background: "rgba(99,102,241,0.18)", color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 8, padding: "9px 0",
              fontSize: 12.5, textDecoration: "none", fontWeight: 600,
            }}>
              ⬇ Download
            </a>
          </div>
        </div>
      </SlideItem>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div style={{ padding: "28px 18px 20px" }}>
      <PageTitle>Experience</PageTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {experience.map((job, i) => (
          <SlideItem key={i} index={i}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${job.color}25`,
              borderLeft: `3px solid ${job.color}`,
              borderRadius: 12, padding: "16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: 14 }}>{job.company}</div>
                  <div style={{ color: job.color, fontSize: 11.5, marginTop: 2 }}>{job.role}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                  <div style={{ color: "#8b949e", fontSize: 10 }}>{job.period}</div>
                  <div style={{ color: "#484f58", fontSize: 10, marginTop: 2 }}>📍 {job.location}</div>
                </div>
              </div>

              {job.blurb && (
                <p style={{
                  fontSize: 12, color: "#c9d1d9", lineHeight: 1.72, fontStyle: "italic",
                  marginBottom: 10, borderLeft: `2px solid ${job.color}40`, paddingLeft: 10,
                }}>
                  {job.blurb}
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {job.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, fontSize: 11.5, color: "#a0aec0", lineHeight: 1.6 }}>
                    <span style={{ color: job.color, flexShrink: 0 }}>›</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </SlideItem>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div style={{ padding: "28px 18px 20px" }}>
      <PageTitle>Projects</PageTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.map((proj, i) => (
          <SlideItem key={proj.id} index={i}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${proj.color}25`,
              borderRadius: 12, padding: "16px", overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: `${proj.color}20`, border: `1px solid ${proj.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>
                  {proj.icon}
                </div>
                <div>
                  <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: 14 }}>{proj.name}</div>
                  <div style={{ color: proj.color, fontSize: 11, marginTop: 2 }}>{proj.tagline}</div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {proj.stats.map((s, j) => (
                  <div key={j} style={{
                    flex: 1, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8, padding: "8px 6px", textAlign: "center",
                  }}>
                    <div style={{ color: proj.color, fontSize: 14, fontWeight: 700 }}>{s.value}</div>
                    <div style={{ color: "#8b949e", fontSize: 9, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Blurb */}
              <p style={{ fontSize: 12.5, color: "#c9d1d9", lineHeight: 1.75, fontStyle: "italic", marginBottom: 10 }}>
                {proj.blurb}
              </p>

              {/* Read more toggle */}
              <button
                onClick={() => toggle(proj.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: proj.color, fontSize: 12, fontWeight: 600,
                  padding: "2px 0", marginBottom: expanded === proj.id ? 12 : 4,
                  display: "flex", alignItems: "center", gap: 5,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <motion.span
                  animate={{ rotate: expanded === proj.id ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  style={{ display: "inline-block", fontSize: 10 }}
                >
                  ▶
                </motion.span>
                {expanded === proj.id ? "Show less" : "Read more"}
              </button>

              {/* STAR expand */}
              <AnimatePresence initial={false}>
                {expanded === proj.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                    style={{ overflow: "hidden", marginBottom: 12 }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <StarBlock label="S — Situation" color={proj.color} text={proj.star.situation} />
                      <StarBlock label="T — Task"      color={proj.color} text={proj.star.task} />
                      <div>
                        <StarLabel label="A — Action" color={proj.color} />
                        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 7 }}>
                          {proj.star.action.map((pt, k) => (
                            <div key={k} style={{ display: "flex", gap: 8, fontSize: 12, color: "#a0aec0", lineHeight: 1.7 }}>
                              <span style={{ color: proj.color, flexShrink: 0, fontSize: 9, marginTop: 4 }}>◆</span>
                              {pt}
                            </div>
                          ))}
                        </div>
                      </div>
                      <StarBlock label="R — Result" color={proj.color} text={proj.star.result} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                {proj.stack.map(t => (
                  <span key={t} style={{
                    background: `${proj.color}12`, color: proj.color,
                    border: `1px solid ${proj.color}30`,
                    borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: 8 }}>
                <a href={`https://${proj.github}`} target="_blank" rel="noreferrer" style={{
                  flex: 1, textAlign: "center",
                  background: `${proj.color}15`, color: proj.color,
                  border: `1px solid ${proj.color}35`,
                  borderRadius: 8, padding: "8px 0",
                  fontSize: 12, textDecoration: "none", fontWeight: 500,
                }}>
                  🐙 GitHub
                </a>
                {proj.demo && (
                  <a href={`https://${proj.demo}`} target="_blank" rel="noreferrer" style={{
                    flex: 1, textAlign: "center",
                    background: `${proj.color}15`, color: proj.color,
                    border: `1px solid ${proj.color}35`,
                    borderRadius: 8, padding: "8px 0",
                    fontSize: 12, textDecoration: "none", fontWeight: 500,
                  }}>
                    🚀 Live
                  </a>
                )}
              </div>
            </div>
          </SlideItem>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={{ padding: "28px 18px 20px" }}>
      <PageTitle>Skills</PageTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.entries(skills).map(([category, items], i) => (
          <SlideItem key={category} index={i}>
            <Card>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: "#818cf8", letterSpacing: 0.6, marginBottom: 10, textTransform: "uppercase" }}>
                {category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map(skill => (
                  <span key={skill} style={{
                    background: "rgba(129,140,248,0.1)", color: "#a5b4fc",
                    border: "1px solid rgba(129,140,248,0.22)",
                    borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </SlideItem>
        ))}
      </div>
    </div>
  );
}

function MoreSection() {
  return (
    <div style={{ padding: "28px 18px 20px" }}>
      {/* Achievements */}
      <SectionLabel>Achievements</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
        {achievements.map((a, i) => (
          <SlideItem key={i} index={i}>
            <Card>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {(ACHIEVEMENT_LOGOS[a.title] || a.logo)
                  ? <img src={ACHIEVEMENT_LOGOS[a.title] || a.logo} alt={a.title} style={{ width: 26, height: 26, flexShrink: 0, objectFit: "contain", marginTop: 1 }} />
                  : <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
                }
                <div>
                  <div style={{ color: "#f0f6fc", fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                  <div style={{ color: "#a0aec0", fontSize: 12, marginTop: 3, lineHeight: 1.5, marginBottom: a.skills ? 8 : 0 }}>{a.desc}</div>
                  {a.skills && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {a.skills.map(skill => (
                        <span key={skill} style={{
                          background: "rgba(88,166,255,0.1)", color: "#58a6ff",
                          border: "1px solid rgba(88,166,255,0.25)",
                          borderRadius: 20, padding: "2px 9px",
                          fontSize: 10.5, fontWeight: 500,
                        }}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </SlideItem>
        ))}
      </div>

      {/* Education */}
      <SectionLabel>Education</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
        {education.map((edu, i) => (
          <SlideItem key={i} index={i}>
            <Card>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{edu.icon}</span>
                <div>
                  <div style={{ color: "#f0f6fc", fontWeight: 600, fontSize: 13 }}>{edu.institution}</div>
                  <div style={{ color: "#818cf8", fontSize: 11.5, marginTop: 2 }}>{edu.degree}</div>
                  <div style={{ color: "#8b949e", fontSize: 10.5, marginTop: 3 }}>{edu.period} · {edu.location}</div>
                </div>
              </div>
            </Card>
          </SlideItem>
        ))}
      </div>

      <SlideItem index={1}>
        <Card>
          <SectionLabel>Get in Touch</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <ContactRow icon="📧" text={profile.email}    href={`mailto:${profile.email}`} />
            <ContactRow icon="📞" text={profile.phone}    href={`tel:${profile.phone}`} />
            <ContactRow logo={linkedinLogo} text={profile.linkedin} href={`https://${profile.linkedin}`} />
            <ContactRow logo="https://cdn.simpleicons.org/github/ffffff"   text={profile.github}   href={`https://${profile.github}`} />
            <ContactRow icon="📍" text={profile.location} />
          </div>
        </Card>
      </SlideItem>
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SlideItem({ children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.32, ease: [0.2, 0, 0, 1], delay: index * 0.07 }}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "14px 16px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function PageTitle({ children }) {
  return (
    <div style={{ color: "#f0f6fc", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
      color: "#484f58", fontWeight: 600, marginBottom: 10,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

function ContactRow({ icon, logo, text, href }) {
  const inner = (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {logo
        ? <img src={logo} alt="" style={{ width: 18, height: 18, flexShrink: 0, objectFit: "contain" }} />
        : <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
      }
      <span style={{ color: href ? "#818cf8" : "#a0aec0", fontSize: 12, wordBreak: "break-all" }}>{text}</span>
    </div>
  );
  return href
    ? <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{inner}</a>
    : inner;
}

function StarLabel({ label, color }) {
  return (
    <span style={{ fontSize: 9, letterSpacing: 1.2, textTransform: "uppercase", color, fontWeight: 700, opacity: 0.8 }}>
      {label}
    </span>
  );
}

function StarBlock({ label, color, text }) {
  return (
    <div>
      <StarLabel label={label} color={color} />
      <p style={{
        fontSize: 12, color: "#a0aec0", lineHeight: 1.75,
        marginTop: 6, borderLeft: `2px solid ${color}40`, paddingLeft: 10,
      }}>
        {text}
      </p>
    </div>
  );
}
