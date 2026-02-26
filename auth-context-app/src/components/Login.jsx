import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(username);
    }, 1200);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${focusedField === field ? "rgba(250,204,21,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focusedField === field ? "rgba(250,204,21,0.04)" : "rgba(255,255,255,0.03)",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    outline: "none",
    transition: "all 0.25s",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(250,204,21,0.08)" : "none",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080809",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background mesh */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(250,204,21,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        margin: "24px",
        animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #FACC15, #F59E0B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: "24px", boxShadow: "0 8px 32px rgba(250,204,21,0.25)",
          }}>🎓</div>
          <h1 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: "600", color: "#fff", letterSpacing: "-0.03em", fontFamily: "'DM Mono', monospace" }}>
            Welcome back
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
            Sign in to your CU portal
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "32px",
          backdropFilter: "blur(12px)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Username</label>
              <input
                type="text"
                placeholder="e.g. alisha"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("username")}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("password")}
              />
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "13px", color: "#FCA5A5" }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "6px",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: loading ? "rgba(250,204,21,0.5)" : "linear-gradient(135deg, #FACC15, #F59E0B)",
                color: "#000",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "'DM Mono', monospace",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.05em",
                boxShadow: loading ? "none" : "0 4px 20px rgba(250,204,21,0.2)",
              }}
            >
              {loading ? "Authenticating…" : "Sign In →"}
            </button>
          </form>

          {/* Hint */}
          <p style={{ margin: "20px 0 0", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            Any username + password will work for demo
          </p>
        </div>

        {/* Footer tag */}
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
          CHANDIGARH UNIVERSITY · AUTH CONTEXT DEMO
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}