import { useAuth } from "../context/AuthContext";

const stats = [
  { label: "Courses Enrolled", value: "6", icon: "📚" },
  { label: "Assignments Due", value: "3", icon: "📝" },
  { label: "Attendance", value: "87%", icon: "✅" },
  { label: "CGPA", value: "8.4", icon: "🏆" },
];

const activity = [
  { text: "Submitted Lab Report — OS", time: "2h ago" },
  { text: "Attended DBMS Lecture", time: "5h ago" },
  { text: "Quiz completed — CN", time: "Yesterday" },
  { text: "Assignment uploaded — DSA", time: "2 days ago" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080809",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(250,204,21,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Topbar */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 36px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 10,
        animation: "fadeDown 0.5s ease both",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #FACC15, #F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🎓</div>
          <span style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.01em", color: "#fff" }}>Chandigarh University</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#fff" }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>{user?.id}</p>
          </div>
          <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg, #FACC15, #F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "15px", color: "#000" }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={logout}
            style={{
              padding: "8px 18px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.25)",
              background: "rgba(239,68,68,0.06)", color: "#F87171",
              fontSize: "12px", cursor: "pointer", fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.05em", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)"; }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "40px 36px", maxWidth: "960px", margin: "0 auto" }}>

        {/* Greeting */}
        <div style={{ marginBottom: "36px", animation: "fadeUp 0.5s ease both" }}>
          <p style={{ margin: "0 0 6px", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Student Portal — India</p>
          <h1 style={{ margin: 0, fontSize: "clamp(26px, 4vw, 38px)", fontWeight: "500", letterSpacing: "-0.03em", color: "#fff" }}>
            Hello, {user?.name}<span style={{ color: "#FACC15" }}>.</span>
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Logged in via <span style={{ color: "#FACC15" }}>AuthContext</span> — no page reload occurred.
          </p>
        </div>

        {/* Auth Context Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          padding: "12px 20px", borderRadius: "12px",
          background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)",
          marginBottom: "32px", animation: "fadeUp 0.5s 0.1s ease both",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FACC15", boxShadow: "0 0 8px #FACC15", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "12px", color: "rgba(250,204,21,0.9)", letterSpacing: "0.1em" }}>
            AUTH STATE: AUTHENTICATED · useContext(AuthContext)
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {stats.map((s, i) => (
            <div key={s.label}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px", padding: "24px",
                animation: `fadeUp 0.5s ${0.1 + i * 0.07}s ease both`,
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(250,204,21,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>{s.icon}</div>
              <p style={{ margin: "0 0 4px", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
              <h2 style={{ margin: 0, fontSize: "32px", fontWeight: "400", color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</h2>
            </div>
          ))}
        </div>

        {/* Two-col */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>

          {/* Recent Activity */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px", animation: "fadeUp 0.5s 0.35s ease both" }}>
            <p style={{ margin: "0 0 20px", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Recent Activity</p>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < activity.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FACC15", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{a.text}</span>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", flexShrink: 0, marginLeft: "12px" }}>{a.time}</span>
              </div>
            ))}
          </div>

          {/* Profile Card */}
          <div style={{ background: "rgba(250,204,21,0.04)", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "16px", padding: "28px", animation: "fadeUp 0.5s 0.4s ease both" }}>
            <p style={{ margin: "0 0 20px", fontSize: "11px", color: "rgba(250,204,21,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Your Info</p>
            {[
              ["Name", user?.name],
              ["Role", user?.role],
              ["ID", user?.id],
              ["University", user?.university],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: "16px" }}>
                <p style={{ margin: "0 0 3px", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</p>
                <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{value}</p>
              </div>
            ))}
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(250,204,21,0.1)" }}>
              <span style={{ fontSize: "11px", color: "rgba(250,204,21,0.6)", letterSpacing: "0.1em" }}>✓ Authenticated via Context API</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}