export function SectionHeader({ children }) {
  return (
    <div style={{
      fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
      color: "#484f58", fontWeight: 600, marginBottom: 10,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}
