import { useState, useEffect, useRef } from "react";

// ─── Router Implementation (client-side, no external deps) ───────────────────
function useRouter() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (to) => { window.location.hash = to; };
  return { path, navigate };
}

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Revenue", value: "₹20.6L", delta: "+14.2%", up: true },
  { label: "Users", value: "18,492", delta: "+8.7%", up: true },
  { label: "Churn", value: "2.1%", delta: "-0.4%", up: false },
  { label: "NPS", value: "74", delta: "+3", up: true },
];

const activity = [
  { user: "Aryan Mehta", action: "Upgraded to Pro", time: "2m ago", avatar: "AM" },
  { user: "Priya Sharma", action: "Submitted report", time: "18m ago", avatar: "PS" },
  { user: "Rohan Verma", action: "Resolved ticket #441", time: "1h ago", avatar: "RV" },
  { user: "Sneha Iyer", action: "Created new workspace", time: "3h ago", avatar: "SI" },
  { user: "Karan Patel", action: "Exported analytics", time: "5h ago", avatar: "KP" },
];

const projects = [
  { name: "Helix Redesign", progress: 78, status: "On Track", color: "#6EE7B7" },
  { name: "API Migration", progress: 45, status: "At Risk", color: "#FCD34D" },
  { name: "Mobile App v3", progress: 91, status: "Ahead", color: "#6EE7B7" },
  { name: "Data Pipeline", progress: 22, status: "Behind", color: "#FCA5A5" },
];

const skills = [
  { name: "React & HTML/CSS", level: 72 },
  { name: "JavaScript", level: 68 },
  { name: "Node.js & Express", level: 60 },
  { name: "Python Basics", level: 55 },
  { name: "SQL & Databases", level: 50 },
];

const navLinks = [
  { path: "/", label: "Dashboard", icon: "◈" },
  { path: "/profile", label: "Profile", icon: "◉" },
  { path: "/projects", label: "Projects", icon: "◫" },
  { path: "/settings", label: "Settings", icon: "◎" },
];

// ─── Components ───────────────────────────────────────────────────────────────
function StatCard({ label, value, delta, up, delay }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "28px",
      animation: `fadeUp 0.6s ease both`,
      animationDelay: `${delay}ms`,
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.3s, transform 0.3s",
      cursor: "default",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(110,231,183,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: up ? "radial-gradient(circle, rgba(110,231,183,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(252,165,165,0.1) 0%, transparent 70%)", borderRadius: "0 16px 0 80px" }} />
      <p style={{ margin: 0, fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{label}</p>
      <h2 style={{ margin: "10px 0 6px", fontSize: "36px", fontFamily: "'Georgia', serif", fontWeight: "400", color: "#fff", letterSpacing: "-0.02em" }}>{value}</h2>
      <span style={{ fontSize: "13px", color: up ? "#6EE7B7" : "#FCA5A5", fontFamily: "'Courier New', monospace" }}>{delta}</span>
    </div>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "4px", transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ margin: "0 0 6px", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Overview — India · Feb 2026</p>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Georgia', serif", fontWeight: "400", color: "#fff", letterSpacing: "-0.03em" }}>Good morning, Alisha<span style={{ color: "#6EE7B7" }}>.</span></h1>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "36px" }}>
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 80} />)}
      </div>

      {/* Two-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>
        {/* Activity */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
          <h3 style={{ margin: "0 0 24px", fontSize: "13px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: `hsl(${i * 60}, 60%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#000", flexShrink: 0, fontFamily: "'Courier New', monospace" }}>{a.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#fff", fontWeight: "500" }}>{a.user}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{a.action}</p>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(110,231,183,0.12), rgba(110,231,183,0.04))", border: "1px solid rgba(110,231,183,0.2)", borderRadius: "16px", padding: "28px" }}>
            <p style={{ margin: "0 0 8px", fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(110,231,183,0.7)", textTransform: "uppercase" }}>Monthly Goal</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "42px", fontFamily: "'Georgia', serif", color: "#6EE7B7", lineHeight: 1 }}>83</span>
              <span style={{ fontSize: "18px", color: "rgba(110,231,183,0.5)" }}>%</span>
            </div>
            <div style={{ marginTop: "14px" }}>
              <ProgressBar value={83} color="#6EE7B7" />
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", flex: 1 }}>
            <p style={{ margin: "0 0 16px", fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>System Status</p>
            {["API", "Database", "CDN", "Auth"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{s}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6EE7B7", boxShadow: "0 0 8px #6EE7B7", animation: "pulse 2s infinite", animationDelay: `${i * 0.3}s` }} />
                  <span style={{ fontSize: "11px", color: "#6EE7B7", fontFamily: "'Courier New', monospace" }}>Operational</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ margin: "0 0 6px", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Account</p>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Georgia', serif", fontWeight: "400", color: "#fff", letterSpacing: "-0.03em" }}>Your Profile<span style={{ color: "#6EE7B7" }}>.</span></h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>
        {/* Left Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "36px 28px", textAlign: "center" }}>
            <div style={{ width: "90px", height: "90px", borderRadius: "24px", background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "32px", fontFamily: "'Georgia', serif", color: "#000", fontWeight: "700" }}>A</div>
            <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontFamily: "'Georgia', serif", color: "#fff", fontWeight: "400" }}>Alisha</h2>
            <p style={{ margin: "0 0 2px", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", letterSpacing: "0.12em" }}>23BAI70500</p>
            <p style={{ margin: "0 0 20px", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>Junior Engineer · 0–2 yrs exp</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
              {["PRO", "VERIFIED"].map(tag => (
                <span key={tag} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: "#6EE7B7" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
            <p style={{ margin: "0 0 16px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Contact</p>
            {[
              ["✉", "alisha@gmail.com"],
              ["◌", "India"],
              ["◇", "github.com/alisha"],
            ].map(([icon, val]) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>{icon}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
            <p style={{ margin: "0 0 20px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>About</p>
            <p style={{ margin: 0, lineHeight: "1.8", color: "rgba(255,255,255,0.65)", fontSize: "15px" }}>
              Full-stack developer in the early stages of her career, with 0–2 years of hands-on experience building web applications and APIs. Passionate about clean code, intuitive UI, and growing within the engineering team at 23BAI70500. Currently based in India and eager to contribute to impactful projects.
            </p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
            <p style={{ margin: "0 0 24px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Expertise</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{s.name}</span>
                    <span style={{ fontSize: "12px", color: "#6EE7B7", fontFamily: "'Courier New', monospace" }}>{s.level}%</span>
                  </div>
                  <ProgressBar value={s.level} color={`hsl(${160 - i * 12}, 70%, 70%)`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: "0 0 6px", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Workspace</p>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Georgia', serif", fontWeight: "400", color: "#fff", letterSpacing: "-0.03em" }}>Projects<span style={{ color: "#6EE7B7" }}>.</span></h1>
        </div>
        <button style={{ padding: "12px 24px", borderRadius: "12px", background: "#6EE7B7", border: "none", color: "#000", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>+ New Project</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {projects.map((p, i) => (
          <div key={p.name} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "28px",
            animation: `fadeUp 0.5s ease both`,
            animationDelay: `${i * 100}ms`,
            transition: "border-color 0.3s, transform 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "66"; e.currentTarget.style.transform = "translateY(-4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${p.color}22`, border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: p.color }}>◫</div>
              <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em", background: `${p.color}18`, border: `1px solid ${p.color}33`, color: p.color }}>{p.status}</span>
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: "17px", color: "#fff", fontFamily: "'Georgia', serif", fontWeight: "400" }}>{p.name}</h3>
            <p style={{ margin: "0 0 20px", fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace" }}>Updated 2 days ago</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>Progress</span>
              <span style={{ fontSize: "13px", color: p.color, fontFamily: "'Courier New', monospace" }}>{p.progress}%</span>
            </div>
            <ProgressBar value={p.progress} color={p.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const Toggle = ({ on, onChange }) => (
    <div onClick={() => onChange(!on)} style={{
      width: "44px", height: "24px", borderRadius: "12px",
      background: on ? "#6EE7B7" : "rgba(255,255,255,0.1)",
      border: `1px solid ${on ? "#6EE7B7" : "rgba(255,255,255,0.15)"}`,
      cursor: "pointer", position: "relative", transition: "all 0.25s",
    }}>
      <div style={{ position: "absolute", top: "3px", left: on ? "22px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: on ? "#000" : "rgba(255,255,255,0.5)", transition: "left 0.25s" }} />
    </div>
  );

  const settings = [
    { label: "Email Notifications", desc: "Receive updates via email", value: notifications, set: setNotifications },
    { label: "Dark Mode", desc: "Use dark color scheme", value: darkMode, set: setDarkMode },
    { label: "Auto-save drafts", desc: "Save work automatically", value: autoSave, set: setAutoSave },
  ];

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ margin: "0 0 6px", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Preferences</p>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Georgia', serif", fontWeight: "400", color: "#fff", letterSpacing: "-0.03em" }}>Settings<span style={{ color: "#6EE7B7" }}>.</span></h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", gridColumn: "1 / -1" }}>
          <p style={{ margin: "0 0 24px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Preferences</p>
          {settings.map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <p style={{ margin: 0, fontSize: "14px", color: "#fff" }}>{s.label}</p>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{s.desc}</p>
              </div>
              <Toggle on={s.value} onChange={s.set} />
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
          <p style={{ margin: "0 0 20px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Security</p>
          {["Change Password", "Two-Factor Auth", "Active Sessions"].map(item => (
            <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
            >
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>{item}</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "16px" }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
          <p style={{ margin: "0 0 20px", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Plan</p>
          <div style={{ background: "linear-gradient(135deg, rgba(110,231,183,0.1), rgba(59,130,246,0.08))", border: "1px solid rgba(110,231,183,0.2)", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "18px", fontFamily: "'Georgia', serif", color: "#fff" }}>Pro Plan</p>
            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "#6EE7B7", fontFamily: "'Courier New', monospace" }}>₹4,099 / month</p>
            <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Renews March 1, 2026</p>
          </div>
          <button style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", fontSize: "13px", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>Manage Billing</button>
        </div>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
export default function App() {
  const { path, navigate } = useRouter();

  const pages = { "/": Dashboard, "/profile": Profile, "/projects": Projects, "/settings": Settings };
  const Page = pages[path] || Dashboard;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0A0A0B; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'EB Garamond', Georgia, serif", background: "#0A0A0B" }}>

        {/* Sidebar */}
        <aside style={{
          width: "240px",
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 20px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "rgba(255,255,255,0.01)",
        }}>
          {/* Logo */}
          <div style={{ marginBottom: "48px", paddingLeft: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#000", fontWeight: "700", fontFamily: "'Courier New', monospace" }}>23</div>
              <span style={{ fontSize: "15px", color: "#fff", fontFamily: "'EB Garamond', Georgia, serif", letterSpacing: "-0.01em" }}>23BAI70500</span>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1 }}>
            <p style={{ margin: "0 0 12px 12px", fontSize: "10px", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Menu</p>
            {navLinks.map(link => {
              const active = path === link.path;
              return (
                <button key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    width: "100%", padding: "12px 14px",
                    borderRadius: "12px", border: "none",
                    background: active ? "rgba(110,231,183,0.1)" : "transparent",
                    color: active ? "#6EE7B7" : "rgba(255,255,255,0.45)",
                    fontSize: "14px", cursor: "pointer",
                    transition: "all 0.2s",
                    marginBottom: "4px",
                    textAlign: "left",
                    fontFamily: "'EB Garamond', Georgia, serif",
                    letterSpacing: "0.01em",
                    borderLeft: active ? "2px solid #6EE7B7" : "2px solid transparent",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}}
                >
                  <span style={{ fontSize: "16px", opacity: 0.8 }}>{link.icon}</span>
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", display: "flex", alignItems: "center", gap: "10px", paddingLeft: "4px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#000", fontWeight: "700", flexShrink: 0, fontFamily: "'Courier New', monospace" }}>AL</div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", color: "#fff" }}>Alisha</p>
              <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace" }}>23BAI70500</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "48px 52px", overflowY: "auto", maxWidth: "1100px" }}>
          <Page key={path} />
        </main>
      </div>
    </>
  );
}