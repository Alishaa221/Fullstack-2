import { useState } from "react";

const icons = ["🚀", "⚡", "🌟"];

const cards = [
  {
    id: 1,
    tag: "New",
    title: "UI Foundations",
    text: "This card introduces core UI principles with a clean layout, subtle gradients, and balanced spacing for a professional look.",
    stats: { views: "24k", rating: "4.9★", read: "12h" },
  },
  {
    id: 2,
    tag: "Popular",
    title: "Interactive Components",
    text: "This card showcases interactive UI elements with smooth animations and hover effects for enhanced user engagement.",
    stats: { views: "32k", rating: "4.8★", read: "10h" },
  },
  {
    id: 3,
    tag: "Featured",
    title: "Modern Design Patterns",
    text: "This card highlights modern UI patterns built with a dark theme, polished visuals, and responsive Bootstrap grids.",
    stats: { views: "18k", rating: "5.0★", read: "8h" },
  },
];

const theme = [
  {
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    tagBg: "rgba(139,92,246,0.15)",
    tagColor: "#a78bfa",
    glowColor: "rgba(139,92,246,0.35)",
    ambientGlow: "rgba(139,92,246,0.08)",
    shadowGlow: "rgba(139,92,246,0.15)",
  },
  {
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    tagBg: "rgba(6,182,212,0.15)",
    tagColor: "#67e8f9",
    glowColor: "rgba(6,182,212,0.35)",
    ambientGlow: "rgba(6,182,212,0.08)",
    shadowGlow: "rgba(6,182,212,0.15)",
  },
  {
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    tagBg: "rgba(236,72,153,0.15)",
    tagColor: "#f472b6",
    glowColor: "rgba(236,72,153,0.35)",
    ambientGlow: "rgba(236,72,153,0.08)",
    shadowGlow: "rgba(236,72,153,0.15)",
  },
];

function Card({ card, index }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const t = theme[index];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 280px",
        maxWidth: "360px",
        background: "#1e1e2e",
        borderRadius: "20px",
        overflow: "visible",
        border: "1px solid #313244",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${t.shadowGlow}`
          : "0 4px 20px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Gradient Top Bar */}
      <div
        style={{
          height: "5px",
          background: t.gradient,
          borderRadius: "20px 20px 0 0",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.3s",
        }}
      />

      {/* Ambient Glow */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: "-25px",
            background: `radial-gradient(circle, ${t.ambientGlow} 0%, transparent 70%)`,
            borderRadius: "32px",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}

      <div style={{ padding: "26px 28px 28px" }}>
        {/* Badge + Icon */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.4px",
              background: t.tagBg,
              color: t.tagColor,
              padding: "5px 14px",
              borderRadius: "30px",
            }}
          >
            {card.tag}
          </span>
          <span
            style={{
              fontSize: "26px",
              display: "inline-block",
              transform: hovered ? "scale(1.25) rotate(6deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            {icons[index]}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            color: "#cdd6f4",
            fontSize: "1.25rem",
            fontWeight: 700,
            marginBottom: "10px",
            letterSpacing: "-0.2px",
          }}
        >
          {card.title}
        </h3>

        {/* Animated Divider */}
        <div
          style={{
            width: hovered ? "48px" : "28px",
            height: "3px",
            borderRadius: "2px",
            background: t.gradient,
            marginBottom: "14px",
            transition: "width 0.4s ease",
          }}
        />

        {/* Description */}
        <p
          style={{
            color: "#a6adc8",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            marginBottom: "22px",
            minHeight: "52px",
          }}
        >
          {card.text}
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
          {[
            { value: card.stats.views, label: "Views" },
            { value: card.stats.rating, label: "Rating" },
            { value: card.stats.read, label: "Read" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "#181825",
                borderRadius: "10px",
                padding: "10px 4px",
                textAlign: "center",
                border: "1px solid #313244",
                transition: "border-color 0.3s",
                borderColor: hovered ? (i === 0 ? t.tagColor + "33" : "#313244") : "#313244",
              }}
            >
              <div style={{ color: "#cdd6f4", fontWeight: 700, fontSize: "0.87rem" }}>
                {stat.value}
              </div>
              <div
                style={{
                  color: "#585b70",
                  fontSize: "0.68rem",
                  marginTop: "3px",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          onMouseLeave={() => setClicked(false)}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: "12px",
            background: clicked
              ? "rgba(255,255,255,0.05)"
              : hovered
              ? t.gradient
              : "transparent",
            color: hovered ? "#fff" : "#a6adc8",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.4px",
            border: hovered ? "1px solid transparent" : "1px solid #313244",
            boxShadow: hovered ? `0 4px 20px ${t.glowColor}` : "none",
            transform: clicked ? "scale(0.96)" : "scale(1)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            outline: "none",
          }}
        >
          View More
          <span
            style={{
              display: "inline-block",
              transform: hovered ? "translateX(5px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
          </span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ambient Blobs */}
      <div
        style={{
          position: "fixed",
          top: "-200px",
          left: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          right: "-150px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px", position: "relative", zIndex: 1 }}>
        <p
          style={{
            color: "#585b70",
            fontSize: "0.76rem",
            textTransform: "uppercase",
            letterSpacing: "3.5px",
            marginBottom: "14px",
            fontWeight: 600,
          }}
        >

        </p>
        <h1
          style={{
            color: "#cdd6f4",
            fontSize: "2.3rem",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          Card-Based Layout
        </h1>
        <p
          style={{
            color: "#585b70",
            fontSize: "0.92rem",
            maxWidth: "460px",
            margin: "14px auto 0",
            lineHeight: 1.7,
          }}
        >
        </p>
      </div>

      {/* Cards Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "26px",
          maxWidth: "1120px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {cards.map((card, i) => (
          <Card key={card.id} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}