import { useState, useEffect } from "react";

function useRouter() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return { path, navigate: (to) => (window.location.hash = to) };
}

// ── Pages ──────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div style={page}>
      <div style={icon}>🏠</div>
      <h1 style={title}>Home</h1>
      <p style={sub}>Welcome! This is the <b>default route</b> ( / )</p>
    </div>
  );
}

function About() {
  return (
    <div style={page}>
      <div style={icon}>👤</div>
      <h1 style={title}>About</h1>
      <p style={sub}>This is the <b>/about</b> route.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={page}>
      <div style={icon}>✉️</div>
      <h1 style={title}>Contact</h1>
      <p style={sub}>This is the <b>/contact</b> route.</p>
    </div>
  );
}

function NotFound() {
  const { navigate } = useRouter();
  return (
    <div style={{ ...page, gap: "14px" }}>
      <div style={{ ...icon, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}>⚠️</div>
      <h1 style={{ ...title, color: "#F87171" }}>404 — Page Not Found</h1>
      <p style={sub}>
        The path <code style={code}>{window.location.hash.slice(1)}</code> does not exist.
      </p>
      <p style={{ ...sub, fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
        No page reload occurred — this is a <b style={{ color: "rgba(255,255,255,0.5)" }}>client-side fallback route</b>.
      </p>
      <button onClick={() => navigate("/")} style={btn}>← Back to Home</button>
    </div>
  );
}

// ── Route Map ──────────────────────────────────────────────────────────────
const routes = {
  "/":        Home,      // default route
  "/about":   About,
  "/contact": Contact,
  // any other path → NotFound (fallback)
};

// ── App Shell ──────────────────────────────────────────────────────────────
export default function App() {
  const { path, navigate } = useRouter();
  const Page = routes[path] ?? NotFound;  // ?? triggers fallback for unknown paths

  const links = [
    { to: "/",        label: "Home" },
    { to: "/about",   label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/xyz",     label: "Test 404 ⚡" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        body { background: #0f0f11; font-family: 'Segoe UI', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* ── Navbar ── */}
        <nav style={{ display: "flex", alignItems: "center", gap: "8px", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
          <span style={{ marginRight: "auto", fontWeight: "700", color: "#fff", fontSize: "16px", letterSpacing: "-0.02em" }}>
            🎓 CU SPA
          </span>
          {links.map(({ to, label }) => (
            <button key={to} onClick={() => navigate(to)} style={{
              padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: path === to ? "rgba(110,231,183,0.15)" : "transparent",
              color: path === to ? "#6EE7B7" : to === "/xyz" ? "#F87171" : "rgba(255,255,255,0.5)",
              fontWeight: path === to ? "600" : "400",
              fontSize: "14px", transition: "all 0.2s",
              outline: to === "/xyz" ? "1px dashed rgba(239,68,68,0.35)" : "none",
            }}>
              {label}
            </button>
          ))}
        </nav>

        {/* ── Page ── */}
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Page key={path} />
        </main>

        {/* ── Footer ── */}
        <footer style={{ textAlign: "center", padding: "14px", fontSize: "11px", color: "rgba(255,255,255,0.18)", borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "monospace" }}>
          Current path: <span style={{ color: "#6EE7B7" }}>{path}</span> &nbsp;·&nbsp; No page reload on navigation
        </footer>

      </div>
    </>
  );
}

// ── Shared Styles ──────────────────────────────────────────────────────────
const page = {
  display: "flex", flexDirection: "column", alignItems: "center",
  gap: "16px", textAlign: "center", padding: "40px 24px",
  animation: "fadeUp 0.4s ease both",
};
const icon = {
  width: "72px", height: "72px", borderRadius: "20px", fontSize: "32px",
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)",
};
const title = { fontSize: "32px", color: "#fff", fontWeight: "300", letterSpacing: "-0.02em" };
const sub   = { fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7", maxWidth: "360px" };
const code  = { background: "rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: "5px", color: "#F87171", fontFamily: "monospace", fontSize: "13px" };
const btn   = { padding: "10px 28px", borderRadius: "10px", background: "#6EE7B7", border: "none", color: "#000", fontWeight: "700", fontSize: "14px", cursor: "pointer" };