// ============================================================
// FULL STACK CRUD APP — React + Simulated Express/Node Backend
// JWT Auth | MongoDB-style DB | CORS | Error Handling | CRUD
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";

// ─────────────────────────────────────────────
// SIMULATED BACKEND (Express/Node.js + MongoDB)
// In a real app, replace with actual API calls
// ─────────────────────────────────────────────
const simulateDelay = (ms = 400) => new Promise(res => setTimeout(res, ms));

const DB = {
  users: [{ id: "u1", name: "Demo User", email: "demo@app.com", password: "demo123", role: "admin" }],
  tasks: [
    { _id: "t1", title: "Design database schema", description: "Create ERD for the new project", status: "done", priority: "high", userId: "u1", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { _id: "t2", title: "Build REST API", description: "Express routes with JWT middleware", status: "in-progress", priority: "high", userId: "u1", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: "t3", title: "Setup CI/CD pipeline", description: "GitHub Actions for deployment", status: "todo", priority: "medium", userId: "u1", createdAt: new Date().toISOString() },
  ],
  tokens: new Set(),
};

const JWT = {
  sign: (payload) => {
    const token = btoa(JSON.stringify({ ...payload, exp: Date.now() + 3600000 }));
    DB.tokens.add(token);
    return token;
  },
  verify: (token) => {
    if (!token || !DB.tokens.has(token)) throw new Error("Invalid or expired token");
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) { DB.tokens.delete(token); throw new Error("Token expired"); }
    return payload;
  },
  invalidate: (token) => DB.tokens.delete(token),
};

let nextId = 100;
const genId = () => `t${++nextId}`;

// Simulated Express Router
const API = {
  // POST /auth/login
  login: async ({ email, password }) => {
    await simulateDelay(600);
    const user = DB.users.find(u => u.email === email && u.password === password);
    if (!user) { const e = new Error("Invalid credentials"); e.status = 401; throw e; }
    const { password: _, ...safeUser } = user;
    return { token: JWT.sign({ userId: user.id, email: user.email }), user: safeUser };
  },
  // POST /auth/register
  register: async ({ name, email, password }) => {
    await simulateDelay(700);
    if (DB.users.find(u => u.email === email)) { const e = new Error("Email already registered"); e.status = 409; throw e; }
    if (!name || !email || !password) { const e = new Error("All fields required"); e.status = 400; throw e; }
    if (password.length < 6) { const e = new Error("Password min 6 chars"); e.status = 400; throw e; }
    const user = { id: `u${Date.now()}`, name, email, password, role: "user" };
    DB.users.push(user);
    const { password: _, ...safeUser } = user;
    return { token: JWT.sign({ userId: user.id, email }), user: safeUser };
  },
  // GET /tasks
  getTasks: async (token) => {
    await simulateDelay(500);
    const { userId } = JWT.verify(token);
    return DB.tasks.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  // POST /tasks
  createTask: async (token, body) => {
    await simulateDelay(550);
    const { userId } = JWT.verify(token);
    if (!body.title?.trim()) { const e = new Error("Title is required"); e.status = 400; throw e; }
    const task = { _id: genId(), title: body.title.trim(), description: body.description || "", status: body.status || "todo", priority: body.priority || "medium", userId, createdAt: new Date().toISOString() };
    DB.tasks.push(task);
    return task;
  },
  // PUT /tasks/:id
  updateTask: async (token, id, body) => {
    await simulateDelay(500);
    const { userId } = JWT.verify(token);
    const idx = DB.tasks.findIndex(t => t._id === id && t.userId === userId);
    if (idx === -1) { const e = new Error("Task not found"); e.status = 404; throw e; }
    if (!body.title?.trim()) { const e = new Error("Title is required"); e.status = 400; throw e; }
    DB.tasks[idx] = { ...DB.tasks[idx], ...body, _id: id, userId };
    return DB.tasks[idx];
  },
  // DELETE /tasks/:id
  deleteTask: async (token, id) => {
    await simulateDelay(400);
    const { userId } = JWT.verify(token);
    const idx = DB.tasks.findIndex(t => t._id === id && t.userId === userId);
    if (idx === -1) { const e = new Error("Task not found"); e.status = 404; throw e; }
    DB.tasks.splice(idx, 1);
    return { message: "Task deleted" };
  },
  // POST /auth/logout
  logout: async (token) => {
    await simulateDelay(200);
    JWT.invalidate(token);
    return { message: "Logged out" };
  },
};

// ─────────────────────────────────────────────
//  HTTP CLIENT (simulates fetch with CORS, headers, timeout)
// ─────────────────────────────────────────────
class HttpClient {
  constructor() {
    this.baseURL = "http://localhost:5000/api"; // simulated
    this.timeout = 10000;
  }

  getHeaders(token) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }

  async request(method, endpoint, { body, token } = {}) {
    // CORS check simulation
    if (!this.baseURL.startsWith("http")) throw Object.assign(new Error("CORS Error: Cross-origin request blocked"), { type: "CORS" });
    // Timeout simulation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      // Route to simulated API
      let result;
      if (endpoint === "/auth/login" && method === "POST") result = await API.login(body);
      else if (endpoint === "/auth/register" && method === "POST") result = await API.register(body);
      else if (endpoint === "/auth/logout" && method === "POST") result = await API.logout(token);
      else if (endpoint === "/tasks" && method === "GET") result = await API.getTasks(token);
      else if (endpoint === "/tasks" && method === "POST") result = await API.createTask(token, body);
      else if (endpoint.match(/^\/tasks\/\w+$/) && method === "PUT") result = await API.updateTask(token, endpoint.split("/")[2], body);
      else if (endpoint.match(/^\/tasks\/\w+$/) && method === "DELETE") result = await API.deleteTask(token, endpoint.split("/")[2]);
      else { const e = new Error(`404 Not Found: ${endpoint}`); e.status = 404; throw e; }
      clearTimeout(timeoutId);
      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") throw Object.assign(new Error("Network timeout: Server not responding"), { type: "TIMEOUT" });
      if (err.status === 401) throw Object.assign(err, { type: "AUTH" });
      if (err.status === 404) throw Object.assign(err, { type: "NOT_FOUND" });
      if (err.status === 400) throw Object.assign(err, { type: "VALIDATION" });
      if (err.status === 409) throw Object.assign(err, { type: "CONFLICT" });
      if (err.status === 500) throw Object.assign(err, { type: "SERVER" });
      throw err;
    }
  }

  get(ep, opts) { return this.request("GET", ep, opts); }
  post(ep, body, opts) { return this.request("POST", ep, { body, ...opts }); }
  put(ep, body, opts) { return this.request("PUT", ep, { body, ...opts }); }
  delete(ep, opts) { return this.request("DELETE", ep, opts); }
}

const http = new HttpClient();

// ─────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────
const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; } });
  const set = useCallback(v => { const next = typeof v === "function" ? v(val) : v; setVal(next); localStorage.setItem(key, JSON.stringify(next)); }, [key, val]);
  return [val, set];
};

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const COLORS = {
  bg: "#0a0a0f", card: "#12121a", border: "#1e1e2e",
  accent: "#6c63ff", accentHover: "#7c74ff", accentDim: "rgba(108,99,255,0.15)",
  text: "#e8e8f0", textMuted: "#888899", textDim: "#555566",
  success: "#22c55e", warning: "#f59e0b", danger: "#ef4444", info: "#38bdf8",
  todo: "#6c63ff", inProgress: "#f59e0b", done: "#22c55e",
  high: "#ef4444", medium: "#f59e0b", low: "#22c55e",
};

const STATUS_META = { todo: { label: "To Do", color: COLORS.todo }, "in-progress": { label: "In Progress", color: COLORS.warning }, done: { label: "Done", color: COLORS.done } };
const PRIORITY_META = { high: { label: "High", color: COLORS.high }, medium: { label: "Medium", color: COLORS.medium }, low: { label: "Low", color: COLORS.low } };

// ─────────────────────────────────────────────
//  UTILITY COMPONENTS
// ─────────────────────────────────────────────
const Badge = ({ color, children }) => (
  <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{children}</span>
);

const Spinner = ({ size = 20, color = COLORS.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "spin 0.8s linear infinite" }}>
    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="40 20" />
  </svg>
);

const Toast = ({ toasts }) => (
  <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
    {toasts.map(t => (
      <div key={t.id} style={{ background: t.type === "error" ? "#1a0a0a" : t.type === "success" ? "#0a1a0a" : "#0a0a1a", border: `1px solid ${t.type === "error" ? COLORS.danger : t.type === "success" ? COLORS.success : COLORS.info}44`, color: t.type === "error" ? COLORS.danger : t.type === "success" ? COLORS.success : COLORS.info, padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, maxWidth: 320, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "slideIn 0.2s ease" }}>
        <span>{t.type === "error" ? "✕" : t.type === "success" ? "✓" : "ℹ"}</span>
        {t.message}
      </div>
    ))}
  </div>
);

const ErrorBanner = ({ error, onDismiss }) => {
  if (!error) return null;
  const typeLabels = { CORS: "CORS Error", AUTH: "Authentication Error", NOT_FOUND: "Not Found (404)", VALIDATION: "Validation Error", SERVER: "Server Error (500)", TIMEOUT: "Network Timeout", CONFLICT: "Conflict Error" };
  return (
    <div style={{ background: "#1a0808", border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: COLORS.danger, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{typeLabels[error.type] || "Error"}</div>
        <div style={{ color: "#ffaaaa", fontSize: 13 }}>{error.message}</div>
        {error.type === "CORS" && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Fix: Add <code>cors()</code> middleware to Express app</div>}
        {error.type === "AUTH" && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Fix: Check JWT token validity & Authorization header</div>}
        {error.type === "NOT_FOUND" && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Fix: Verify endpoint URL matches router definition</div>}
        {error.type === "SERVER" && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Fix: Check server logs for unhandled exceptions</div>}
        {error.type === "TIMEOUT" && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Fix: Increase timeout or check server health</div>}
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }}>✕</button>
    </div>
  );
};

const Input = ({ label, error, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>}
    <input {...props} style={{ width: "100%", background: "#0e0e18", border: `1px solid ${error ? COLORS.danger : COLORS.border}`, borderRadius: 8, padding: "10px 14px", color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "inherit", ...props.style }} />
    {error && <div style={{ color: COLORS.danger, fontSize: 11, marginTop: 4 }}>{error}</div>}
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>}
    <select {...props} style={{ width: "100%", background: "#0e0e18", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px", color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer" }}>{children}</select>
  </div>
);

const Button = ({ loading, variant = "primary", children, ...props }) => {
  const styles = {
    primary: { background: COLORS.accent, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: COLORS.textMuted, border: `1px solid ${COLORS.border}` },
    danger: { background: "transparent", color: COLORS.danger, border: `1px solid ${COLORS.danger}33` },
    success: { background: COLORS.success, color: "#fff", border: "none" },
  };
  return (
    <button {...props} disabled={loading || props.disabled} style={{ ...styles[variant], borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, opacity: loading ? 0.7 : 1, transition: "all 0.15s", fontFamily: "inherit", ...props.style }}>
      {loading && <Spinner size={14} color="currentColor" />}
      {children}
    </button>
  );
};

// ─────────────────────────────────────────────
//  TASK FORM
// ─────────────────────────────────────────────
const TaskForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ title: "", description: "", status: "todo", priority: "medium", ...initial });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.title.length > 100) e.title = "Max 100 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  };

  const f = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setErrors(p => ({ ...p, [k]: undefined })); };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <Input label="Title *" placeholder="What needs to be done?" value={form.title} onChange={f("title")} error={errors.title} autoFocus />
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Description</label>
        <textarea value={form.description} onChange={f("description")} placeholder="Optional details..." rows={3} style={{ width: "100%", background: "#0e0e18", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px", color: COLORS.text, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Select label="Status" value={form.status} onChange={f("status")}>
          {Object.entries(STATUS_META).map(([v, m]) => <option key={v} value={v}>{m.label}</option>)}
        </Select>
        <Select label="Priority" value={form.priority} onChange={f("priority")}>
          {Object.entries(PRIORITY_META).map(([v, m]) => <option key={v} value={v}>{m.label}</option>)}
        </Select>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>{initial?._id ? "Update Task" : "Create Task"}</Button>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────
// TASK CARD
// ─────────────────────────────────────────────
const TaskCard = ({ task, onEdit, onDelete, onStatusChange, deleting }) => {
  const sm = STATUS_META[task.status];
  const pm = PRIORITY_META[task.priority];
  const age = Math.floor((Date.now() - new Date(task.createdAt)) / 86400000);

  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, transition: "border-color 0.2s, transform 0.15s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent + "44"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Badge color={sm.color}>{sm.label}</Badge>
          <Badge color={pm.color}>{pm.label}</Badge>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => onEdit(task)} title="Edit" style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 6px", borderRadius: 4, transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.text} onMouseLeave={e => e.currentTarget.style.color = COLORS.textMuted}>✎</button>
          <button onClick={() => onDelete(task._id)} title="Delete" disabled={deleting} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 6px", borderRadius: 4, transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.danger} onMouseLeave={e => e.currentTarget.style.color = COLORS.textMuted}>
            {deleting ? <Spinner size={12} /> : "✕"}
          </button>
        </div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 6, textDecoration: task.status === "done" ? "line-through" : "none", opacity: task.status === "done" ? 0.6 : 1 }}>{task.title}</div>
      {task.description && <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 10, lineHeight: 1.5 }}>{task.description}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <select value={task.status} onChange={e => onStatusChange(task._id, e.target.value)}
          style={{ background: "#0a0a14", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "4px 8px", color: COLORS.textMuted, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
          {Object.entries(STATUS_META).map(([v, m]) => <option key={v} value={v}>{m.label}</option>)}
        </select>
        <span style={{ color: COLORS.textDim, fontSize: 11 }}>{age === 0 ? "Today" : `${age}d ago`}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// AUTH PAGE
// ─────────────────────────────────────────────
const AuthPage = ({ onAuth }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "demo@app.com", password: "demo123" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim()) e.name = "Name required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.password) e.password = "Password required";
    if (mode === "register" && form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  // Fix: No missing deps in useEffect
  useEffect(() => {
    setErrors({});
    setApiError(null);
    setForm(p => ({ ...p, ...(mode === "login" ? { email: "demo@app.com", password: "demo123" } : { email: "", password: "" }) }));
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError(null);
    try {
      const res = await http.post(`/auth/${mode}`, form);
      onAuth(res.token, res.user);
    } catch (err) {
      setApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const f = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setErrors(p => ({ ...p, [k]: undefined })); };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${COLORS.accent}, #a78bfa)`, borderRadius: 14, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
          <h1 style={{ color: COLORS.text, fontSize: 26, fontWeight: 700, margin: 0 }}>TaskFlow</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 6 }}>Full-Stack CRUD + JWT Auth Demo</p>
        </div>

        {/* Card */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 32 }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "#0a0a14", borderRadius: 8, padding: 3, marginBottom: 24 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, background: mode === m ? COLORS.accent : "transparent", color: mode === m ? "#fff" : COLORS.textMuted, border: "none", borderRadius: 6, padding: "8px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize", fontFamily: "inherit" }}>{m === "login" ? "Sign In" : "Register"}</button>
            ))}
          </div>

          <ErrorBanner error={apiError} onDismiss={() => setApiError(null)} />

          <form onSubmit={handleSubmit}>
            {mode === "register" && <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={f("name")} error={errors.name} />}
            <Input label="Email" type="email" placeholder="email@example.com" value={form.email} onChange={f("email")} error={errors.email} />
            <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={f("password")} error={errors.password} />

            <Button type="submit" loading={loading} style={{ width: "100%", justifyContent: "center", marginTop: 8, padding: "11px 18px" }}>
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {mode === "login" && (
            <p style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 12, marginTop: 16, marginBottom: 0 }}>
              Demo: <span style={{ color: COLORS.accent }}>demo@app.com</span> / <span style={{ color: COLORS.accent }}>demo123</span>
            </p>
          )}
        </div>

        {/* Error Guide */}
        <div style={{ marginTop: 20, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Error Handling Demo</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { type: "401", label: "Wrong credentials", action: () => { setForm({ email: "wrong@test.com", password: "wrongpass" }); setMode("login"); } },
              { type: "409", label: "Duplicate email", action: () => { setForm({ name: "Test", email: "demo@app.com", password: "test123" }); setMode("register"); } },
              { type: "400", label: "Short password", action: () => { setForm({ name: "Test", email: "new@test.com", password: "abc" }); setMode("register"); } },
            ].map(({ type, label, action }) => (
              <button key={type} onClick={action} style={{ background: "#0a0a14", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px", color: COLORS.textMuted, fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit", display: "flex", gap: 8 }}>
                <Badge color={COLORS.danger}>{type}</Badge> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
const Dashboard = ({ token, user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [modal, setModal] = useState(null); // null | 'create' | task
  const [toasts, setToasts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const toastId = useRef(0);

  const toast = useCallback((message, type = "success") => {
    const id = ++toastId.current;
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  // ✅ Fix: useEffect with correct dependencies — no infinite requests
  useEffect(() => {
    let cancelled = false;
    const fetchTasks = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const data = await http.get("/tasks", { token });
        if (!cancelled) setTasks(data);
      } catch (err) {
        if (!cancelled) setApiError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTasks();
    return () => { cancelled = true; };
  }, [token]); // ← token is stable, no infinite loop

  const handleCreate = async (form) => {
    setSubmitting(true);
    setApiError(null);
    try {
      const task = await http.post("/tasks", form, { token });
      setTasks(p => [task, ...p]);
      setModal(null);
      toast("Task created successfully");
    } catch (err) {
      setApiError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (form) => {
    setSubmitting(true);
    setApiError(null);
    try {
      const updated = await http.put(`/tasks/${modal._id}`, form, { token });
      setTasks(p => p.map(t => t._id === updated._id ? updated : t));
      setModal(null);
      toast("Task updated");
    } catch (err) {
      setApiError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setApiError(null);
    try {
      await http.delete(`/tasks/${id}`, { token });
      setTasks(p => p.filter(t => t._id !== id));
      toast("Task deleted", "info");
    } catch (err) {
      setApiError(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    try {
      const updated = await http.put(`/tasks/${id}`, { ...task, status }, { token });
      setTasks(p => p.map(t => t._id === id ? updated : t));
      toast(`Moved to ${STATUS_META[status].label}`);
    } catch (err) {
      setApiError(err);
    }
  };

  const handleLogout = async () => {
    try { await http.post("/auth/logout", {}, { token }); } catch {}
    onLogout();
  };

  const filtered = tasks
    .filter(t => filter === "all" || t.status === filter)
    .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase()));

  const stats = { total: tasks.length, todo: tasks.filter(t => t.status === "todo").length, inProgress: tasks.filter(t => t.status === "in-progress").length, done: tasks.filter(t => t.status === "done").length };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: COLORS.text }}>
      {/* Header */}
      <header style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${COLORS.accent}, #a78bfa)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>TaskFlow</span>
            <Badge color={COLORS.success}>API Connected</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{user.email}</div>
            </div>
            <div style={{ width: 34, height: 34, background: COLORS.accentDim, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, fontWeight: 700, fontSize: 13 }}>{user.name[0]}</div>
            <Button variant="ghost" onClick={handleLogout} style={{ padding: "6px 12px" }}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Tasks", value: stats.total, color: COLORS.accent },
            { label: "To Do", value: stats.todo, color: COLORS.todo },
            { label: "In Progress", value: stats.inProgress, color: COLORS.warning },
            { label: "Completed", value: stats.done, color: COLORS.success },
          ].map(s => (
            <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Error */}
        <ErrorBanner error={apiError} onDismiss={() => setApiError(null)} />

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search tasks..." style={{ flex: 1, minWidth: 180, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "9px 14px", color: COLORS.text, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
          <div style={{ display: "flex", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
            {[["all", "All"], ["todo", "To Do"], ["in-progress", "In Progress"], ["done", "Done"]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{ background: filter === v ? COLORS.accentDim : "transparent", color: filter === v ? COLORS.accent : COLORS.textMuted, border: "none", borderRight: `1px solid ${COLORS.border}`, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{l}</button>
            ))}
          </div>
          <Button onClick={() => setModal("create")}>＋ New Task</Button>
        </div>

        {/* JWT Info */}
        <div style={{ background: "#0a0f1a", border: `1px solid ${COLORS.info}22`, borderRadius: 8, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: COLORS.info, fontSize: 11 }}>🔑</span>
          <code style={{ color: COLORS.info, fontSize: 11 }}>Bearer {token.slice(0, 28)}...</code>
          <span style={{ color: COLORS.textDim, fontSize: 11 }}>← JWT sent with every API request via Authorization header</span>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 80, gap: 12 }}>
            <Spinner size={32} />
            <div style={{ color: COLORS.textMuted, fontSize: 14 }}>Loading tasks from API...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: COLORS.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{search ? "No matching tasks" : "No tasks yet"}</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>{search ? "Try a different search" : "Create your first task above"}</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map(task => (
              <TaskCard key={task._id} task={task} onEdit={setModal} onDelete={handleDelete} onStatusChange={handleStatusChange} deleting={deletingId === task._id} />
            ))}
          </div>
        )}

        {/* API Reference Panel */}
        <div style={{ marginTop: 32, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span>🔌</span> REST API Endpoints
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
            {[
              { method: "POST", path: "/auth/login", desc: "Login + get JWT", color: COLORS.success },
              { method: "POST", path: "/auth/register", desc: "Register new user", color: COLORS.success },
              { method: "POST", path: "/auth/logout", desc: "Invalidate token", color: COLORS.danger },
              { method: "GET", path: "/tasks", desc: "List all user tasks", color: COLORS.info },
              { method: "POST", path: "/tasks", desc: "Create new task", color: COLORS.success },
              { method: "PUT", path: "/tasks/:id", desc: "Update task by ID", color: COLORS.warning },
              { method: "DELETE", path: "/tasks/:id", desc: "Delete task by ID", color: COLORS.danger },
            ].map(ep => (
              <div key={ep.path} style={{ display: "flex", gap: 8, alignItems: "center", background: "#0a0a14", borderRadius: 6, padding: "7px 10px" }}>
                <Badge color={ep.color}>{ep.method}</Badge>
                <code style={{ color: COLORS.textMuted, fontSize: 11 }}>{ep.path}</code>
                <span style={{ color: COLORS.textDim, fontSize: 11, marginLeft: "auto" }}>{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, width: "100%", maxWidth: 480, animation: "slideUp 0.2s ease" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700 }}>{modal === "create" ? "Create New Task" : "Edit Task"}</h3>
            <TaskForm initial={modal !== "create" ? modal : undefined} onSubmit={modal === "create" ? handleCreate : handleUpdate} onCancel={() => setModal(null)} loading={submitting} />
          </div>
        </div>
      )}

      <Toast toasts={toasts} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 3px; }
        input:focus, textarea:focus { border-color: ${COLORS.accent} !important; box-shadow: 0 0 0 3px ${COLORS.accentDim}; }
        select:focus { outline: none; border-color: ${COLORS.accent}; }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [token, setToken] = useLocalStorage("jwt_token", null);
  const [user, setUser] = useLocalStorage("auth_user", null);

  const handleAuth = (tok, usr) => { setToken(tok); setUser(usr); };
  const handleLogout = () => { setToken(null); setUser(null); };

  if (!token || !user) return <AuthPage onAuth={handleAuth} />;
  return <Dashboard token={token} user={user} onLogout={handleLogout} />;
}