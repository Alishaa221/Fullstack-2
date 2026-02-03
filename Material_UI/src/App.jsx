import { useState } from "react";

const InputIcon = ({ type }) => {
  const icons = {
    name: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="8" r="4"/>
      </svg>
    ),
    email: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    phone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    password: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    message: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const fields = [
  { id: "name", label: "Full Name", type: "text", icon: "name", placeholder: "Name" },
  { id: "email", label: "Email Address", type: "email", icon: "email", placeholder: "Email" },
  { id: "phone", label: "Phone Number", type: "tel", icon: "phone", placeholder: "Phone" },
  { id: "password", label: "Password", type: "password", icon: "password", placeholder: "Password" },
  { id: "message", label: "Message", type: "textarea", icon: "message", placeholder: "Write your message here..." },
];

function InputField({ field, value, onChange, focused, onFocus, onBlur }) {
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div style={{ marginBottom: "22px", position: "relative" }}>
      {/* Label */}
      <label
        style={{
          display: "block",
          fontSize: isActive ? "0.72rem" : "0.88rem",
          fontWeight: 600,
          color: isActive ? "#7c3aed" : "#64748b",
          marginBottom: isActive ? "6px" : "0",
          letterSpacing: isActive ? "0.8px" : "0",
          textTransform: isActive ? "uppercase" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {field.label}
      </label>

      {/* Input Wrapper */}
      <div
        style={{
          display: "flex",
          alignItems: field.type === "textarea" ? "flex-start" : "center",
          background: focused ? "rgba(124,58,237,0.04)" : "#f8fafc",
          border: `2px solid ${focused ? "#7c3aed" : hasValue ? "#c4b5fd" : "#e2e8f0"}`,
          borderRadius: "14px",
          padding: field.type === "textarea" ? "14px 16px" : "0 16px",
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 0 0 4px rgba(124,58,237,0.12)" : "none",
          paddingTop: field.type === "textarea" ? "14px" : "0",
        }}
      >
        {/* Icon */}
        <span
          style={{
            color: focused ? "#7c3aed" : "#94a3b8",
            marginRight: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: field.type === "textarea" ? "2px" : "0",
            transition: "color 0.3s ease",
          }}
        >
          <InputIcon type={field.icon} />
        </span>

        {/* Input / Textarea */}
        {field.type === "textarea" ? (
          <textarea
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={field.placeholder}
            rows={4}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "0.92rem",
              color: "#1e293b",
              resize: "vertical",
              minHeight: "80px",
              fontFamily: "inherit",
              "::placeholder": { color: "#94a3b8" },
            }}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={field.placeholder}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "0.92rem",
              color: "#1e293b",
              padding: "14px 0",
              fontFamily: "inherit",
            }}
          />
        )}

        {/* Check icon on valid input */}
        {hasValue && !focused && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (id) => (e) => {
    setFormData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "", password: "", message: "" });
  };

  // ─── Success Screen ───
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 50%, #dbeafe 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "56px 48px", maxWidth: "440px", width: "100%", textAlign: "center", boxShadow: "0 25px 60px rgba(124,58,237,0.12)" }}>
          {/* Success Circle */}
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 30px rgba(124,58,237,0.3)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ color: "#1e293b", fontSize: "1.6rem", fontWeight: 700, marginBottom: "10px" }}>Successfully Submitted!</h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "32px" }}>Your form has been submitted successfully. We'll get back to you shortly.</p>

          {/* Summary */}
          <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "20px", textAlign: "left", marginBottom: "28px" }}>
            {Object.entries(formData).map(([key, val]) => val && (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{key}</span>
                <span style={{ color: "#475569", fontSize: "0.82rem", fontWeight: 500, maxWidth: "60%", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            style={{ width: "100%", padding: "14px", border: "none", borderRadius: "14px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "white", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.5px" }}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  // ─── Form Screen ───
  const filledCount = Object.values(formData).filter(Boolean).length;
  const progress = (filledCount / fields.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 50%, #dbeafe 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', sans-serif" }}>

      {/* Ambient Blobs */}
      <div style={{ position: "fixed", top: "-120px", right: "-120px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-100px", left: "-100px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {/* Logo Circle */}
          <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h1 style={{ color: "#1e293b", fontSize: "1.7rem", fontWeight: 800, marginBottom: "6px" }}>Material UI Form</h1>
          <p style={{ color: "#64748b", fontSize: "0.88rem" }}>Fill in the details below to get started</p>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: "24px", padding: "36px 32px 32px", boxShadow: "0 25px 60px rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.08)" }}>

          {/* Progress Bar */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px" }}>Progress</span>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>{filledCount}/{fields.length} Fields</span>
            </div>
            <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: "3px", transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <InputField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={handleChange(field.id)}
                focused={focusedField === field.id}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
              />
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background: loading ? "#a78bfa" : "linear-gradient(135deg, #7c3aed, #6366f1)",
                color: "white",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.6px",
                boxShadow: loading ? "none" : "0 6px 20px rgba(124,58,237,0.35)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" strokeDasharray="30 70" style={{ animation: "spin 0.8s linear infinite", transformOrigin: "center" }} />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Form
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.78rem", marginTop: "20px" }}>
          🔒 Your information is secure and encrypted
        </p>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #94a3b8; }
        textarea { color: #1e293b; font-size: 0.92rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
        button:active:not(:disabled) { transform: translateY(0); }
      `}</style>
    </div>
  );
}