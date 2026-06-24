import { useState, useRef, useEffect } from "react";
import { profile, projects, skills, experience, achievements } from "../data/portfolio";

const PROMPT = "tri@portfolio:~$ ";

const COMMANDS = {
  help: () => `Available commands:
  whoami          — About me
  ls              — List all sections
  cat about       — Full profile
  cat projects    — All projects
  cat skills      — Skills matrix
  cat experience  — Work history
  cat achievements — Achievements
  contact         — Contact info
  clear           — Clear terminal
  neofetch        — System info`,

  whoami: () => `${profile.name}
Role    : Backend Engineer · AI Systems
Status  : ${profile.status}
Location: ${profile.location}`,

  ls: () => `📁 about/    💼 experience/    📦 projects/
⚡ skills/   🏆 achievements/ 📬 contact/`,

  "cat about": () => profile.summary,

  "cat projects": () =>
    projects
      .map(
        (p) =>
          `${p.icon} ${p.name}\n   ${p.tagline}\n   Stack: ${p.stack.slice(0, 5).join(", ")}...`
      )
      .join("\n\n"),

  "cat skills": () =>
    Object.entries(skills)
      .map(([cat, items]) => `${cat}:\n  ${items.join(", ")}`)
      .join("\n\n"),

  "cat experience": () =>
    experience
      .map(
        (e) =>
          `${e.icon} ${e.company} — ${e.role}\n   ${e.period} · ${e.location}`
      )
      .join("\n\n"),

  "cat achievements": () =>
    achievements.map((a) => `${a.icon} ${a.title}: ${a.desc}`).join("\n"),

  contact: () => `📧 Email    : ${profile.email}
📞 Phone    : ${profile.phone}
🔗 LinkedIn : ${profile.linkedin}
🐙 GitHub   : ${profile.github}`,

  neofetch: () => `
  ██████████████   tri@portfolio
  ██          ██   ────────────────────
  ██  ██  ██  ██   OS      : TriOS 2026
  ██          ██   Kernel  : React 18
  ██  ██████  ██   Shell   : bash
  ██          ██   RAM     : ∞ motivation
  ██████████████   
                   Role    : Backend Engineer
                   Rating  : LeetCode 1834
                   Streak  : Building 🔥`,
};

export default function TerminalWindow() {
  const [lines, setLines] = useState([
    { type: "output", text: 'Welcome to TriOS Terminal. Type "help" to get started.' },
    { type: "output", text: '─'.repeat(52) },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newLines = [...lines, { type: "input", text: cmd }];

      if (cmd === "clear") {
        setLines([{ type: "output", text: 'Terminal cleared. Type "help" for commands.' }]);
      } else if (COMMANDS[cmd]) {
        const result = COMMANDS[cmd]();
        setLines([...newLines, { type: "output", text: result }]);
      } else if (cmd === "") {
        setLines([...newLines]);
      } else {
        setLines([
          ...newLines,
          { type: "error", text: `bash: ${cmd}: command not found. Try 'help'` },
        ]);
      }

      if (cmd) setHistory((h) => [cmd, ...h]);
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  return (
    <div
      style={{
        background: "#0d1117",
        height: "100%",
        padding: "16px 18px",
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: 13,
        color: "#00ff41",
        cursor: "text",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ flex: 1 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: 3, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {line.type === "input" && (
              <span>
                <span style={{ color: "#00bfff" }}>{PROMPT}</span>
                <span style={{ color: "#00ff41" }}>{line.text}</span>
              </span>
            )}
            {line.type === "output" && (
              <span style={{ color: "#b8bec8" }}>{line.text}</span>
            )}
            {line.type === "error" && (
              <span style={{ color: "#f85149" }}>{line.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Input line */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
        <span style={{ color: "#00bfff", flexShrink: 0 }}>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#00ff41",
            fontFamily: "inherit",
            fontSize: 13,
            flex: 1,
            caretColor: "#00ff41",
          }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
