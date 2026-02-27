import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

// ── Cards shown on the page ──────────────────────────────────────────────────
const features = [
  { icon: "🎨", title: "Dynamic Theming", desc: "Theme state lives in Context — no prop drilling needed." },
  { icon: "⚡", title: "Instant Switch", desc: "toggleTheme() flips the state and every component re-renders." },
  { icon: "🔗", title: "Context API", desc: "useContext(ThemeContext) reads the value anywhere in the tree." },
];

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const dark = theme === "dark";

  // ── Design tokens ──
  const t = {
    bg:         dark ? "#0D0D0F"         : "#F4F4F6",
    surface:    dark ? "#18181B"         : "#FFFFFF",
    border:     dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
    text:       dark ? "#F1F1F1"         : "#111113",
    muted:      dark ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.4)",
    accent:     dark ? "#A78BFA"         : "#7C3AED",
    accentBg:   dark ? "rgba(167,139,250,0.1)"  : "rgba(124,58,237,0.08)",
    accentBorder: dark ? "rgba(167,139,250,0.25)" : "rgba(124,58,237,0.25)",
    btnBg:      dark ? "#A78BFA"         : "#7C3AED",
    btnText:    "#fff",
    glow:       dark ? "rgba(167,139,250,0.12)" : "rgba(124,58,237,0.08)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      transition: "background 0.35s, color 0.35s",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background glow */}
      <div style={{ position: "fixed", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)`, pointerEvents: "none", transition: "background 0.35s" }} />

      {/* ── Topbar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: `1px solid ${t.border}`,
        background: t.surface,
        transition: "background 0.35s, border-color 0.35s",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: t.btnBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎓</div>
          <span style={{ fontWeight: "600", fontSize: "15px", color: t.text, transition: "color 0.35s" }}>CU · Context API</span>
        </div>

        {/* Theme badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "6px 14px", borderRadius: "100px", background: t.accentBg, border: `1px solid ${t.accentBorder}`, transition: "all 0.35s" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: t.accent, boxShadow: `0 0 8px ${t.accent}` }} />
            <span style={{ fontSize: "12px", color: t.accent, fontWeight: "500", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              theme: "{theme}"
            </span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px 20px",
              borderRadius: "10px",
              border: "none",
              background: t.btnBg,
              color: t.btnText,
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "6px",
              boxShadow: `0 2px 12px ${t.glow}`,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {dark ? "☀️" : "🌙"} {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 24px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ margin: "0 0 12px", fontSize: "12px", color: t.muted, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", transition: "color 0.35s" }}>
            React Context API · Dark Mode Demo
          </p>
          <h1 style={{ margin: "0 0 16px", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", letterSpacing: "-0.03em", color: t.text, transition: "color 0.35s", lineHeight: 1.15 }}>
            Current Theme<span style={{ color: t.accent }}>:</span>{" "}
            <span style={{ color: t.accent }}>{theme}</span>
          </h1>
          <p style={{ margin: 0, fontSize: "15px", color: t.muted, maxWidth: "440px", margin: "0 auto", lineHeight: "1.7", transition: "color 0.35s" }}>
            The theme state is managed via <code style={{ background: t.accentBg, color: t.accent, padding: "2px 7px", borderRadius: "5px", fontSize: "13px" }}>useContext(ThemeContext)</code> — no prop drilling, no Redux.
          </p>
        </div>

        {/* ── Big Toggle Card ── */}
        <div style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: "20px",
          padding: "36px",
          textAlign: "center",
          marginBottom: "28px",
          transition: "all 0.35s",
          boxShadow: dark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: "52px", marginBottom: "16px", transition: "all 0.35s" }}>
            {dark ? "🌙" : "☀️"}
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: "22px", fontWeight: "600", color: t.text, transition: "color 0.35s" }}>
            {dark ? "Dark Mode Active" : "Light Mode Active"}
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: "14px", color: t.muted, transition: "color 0.35s" }}>
            Background: <code style={{ fontFamily: "monospace", color: t.accent }}>{dark ? "#0D0D0F" : "#F4F4F6"}</code>
            &nbsp;·&nbsp;
            Text: <code style={{ fontFamily: "monospace", color: t.accent }}>{dark ? "#F1F1F1" : "#111113"}</code>
          </p>
          <button
            onClick={toggleTheme}
            style={{
              padding: "14px 40px",
              borderRadius: "12px",
              border: "none",
              background: t.btnBg,
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.01em",
              boxShadow: `0 4px 20px ${t.glow}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
          >
            Toggle Theme →
          </button>
        </div>

        {/* ── Feature Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "16px",
              padding: "22px",
              transition: "all 0.35s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accentBorder; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "22px", marginBottom: "10px" }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "600", color: t.text, transition: "color 0.35s" }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: "12px", color: t.muted, lineHeight: "1.65", transition: "color 0.35s" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}

// ── Wrap with Provider (so useContext works) ─────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}