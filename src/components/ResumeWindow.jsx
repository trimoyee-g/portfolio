export default function ResumeWindow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1c1e26" }}>
      <div style={{
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.03)", flexShrink: 0,
      }}>
        <span style={{ color: "#8b949e", fontSize: 12, fontFamily: "system-ui, sans-serif" }}>
          Trimoyee_Ghosh_Resume.pdf
        </span>
        <a
          href="/Trimoyee_Ghosh_Resume.pdf"
          download="Trimoyee_Ghosh_Resume.pdf"
          style={{
            background: "rgba(99,102,241,0.18)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 6, padding: "5px 14px",
            color: "#818cf8", fontSize: 12, fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          ⬇ Download
        </a>
      </div>
      <iframe
        src="/Trimoyee_Ghosh_Resume.pdf"
        style={{ flex: 1, border: "none", width: "100%", minHeight: 0 }}
        title="Trimoyee Ghosh Resume"
      />
    </div>
  );
}
