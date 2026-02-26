import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

// Navigation Component
function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          React Router App
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: "flex",
            gap: "4px",
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? "white" : "#94a3b8",
                textDecoration: "none",
                padding: "8px 20px",
                borderRadius: "6px",
                fontWeight: isActive(item.path) ? 600 : 500,
                fontSize: "0.95rem",
                background: isActive(item.path) ? "#334155" : "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = "white";
                  e.target.style.background = "#2d3748";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = "#94a3b8";
                  e.target.style.background = "transparent";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "#334155",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            color: "white",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: "none",
            flexDirection: "column",
            gap: "4px",
            paddingBottom: "12px",
          }}
          className="mobile-menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: isActive(item.path) ? "white" : "#94a3b8",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                fontWeight: isActive(item.path) ? 600 : 500,
                background: isActive(item.path) ? "#334155" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

// Page Components

function Home() {
  const features = [
    {
      title: "Fast Performance",
      desc: "Client-side routing provides instant navigation without page reloads, resulting in a smooth user experience",
    },
    {
      title: "Modern Architecture",
      desc: "Built with React and React Router for scalable single-page application development",
    },
    {
      title: "Responsive Design",
      desc: "Fully responsive layout that adapts seamlessly to different screen sizes and devices",
    },
  ];

  return (
    <div style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "100px" }}>
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: 800,
            color: "#1e293b",
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}
        >
          Welcome to React Router
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#64748b",
            maxWidth: "650px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          A demonstration of client-side routing in React applications. Navigate between pages without page reloads using React Router DOM.
        </p>
        <Link
          to="/about"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "#1e293b",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#334155")}
          onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
        >
          Learn More
        </Link>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "36px 28px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: "14px",
              }}
            >
              {feature.title}
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem" }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          background: "white",
          padding: "56px 48px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#1e293b",
            marginBottom: "24px",
            letterSpacing: "-0.5px",
          }}
        >
          About This Application
        </h1>

        <div style={{ color: "#475569", lineHeight: 1.8, fontSize: "1.05rem" }}>
          <p style={{ marginBottom: "20px" }}>
            This application demonstrates the implementation of client-side routing using React Router DOM. React Router is the standard routing library for React applications, enabling navigation between different views without full page reloads.
          </p>

          <h3 style={{ color: "#1e293b", fontSize: "1.5rem", marginTop: "36px", marginBottom: "18px", fontWeight: 700 }}>
            Key Concepts
          </h3>
          <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "14px" }}>
              <strong>BrowserRouter:</strong> Provides routing context for the entire application using the HTML5 history API
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Routes:</strong> Container component that renders the first matching Route
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Route:</strong> Defines a path and the component to render when the path matches
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Link:</strong> Navigation component that updates the URL without reloading the page
            </li>
          </ul>

          <h3 style={{ color: "#1e293b", fontSize: "1.5rem", marginTop: "36px", marginBottom: "18px", fontWeight: 700 }}>
            Benefits of Client-Side Routing
          </h3>
          <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "14px" }}>
              Faster navigation between pages without server round-trips
            </li>
            <li style={{ marginBottom: "14px" }}>
              Better user experience with smooth transitions
            </li>
            <li style={{ marginBottom: "14px" }}>
              Maintains application state during navigation
            </li>
            <li style={{ marginBottom: "14px" }}>
              Supports browser back/forward navigation
            </li>
          </ul>

          <div
            style={{
              background: "#f8fafc",
              padding: "24px",
              borderRadius: "8px",
              borderLeft: "4px solid #1e293b",
              marginTop: "36px",
            }}
          >
            <p style={{ margin: 0, fontWeight: 500 }}>
              This implementation serves as a foundational example for building more complex single-page applications with React Router.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Building modern, responsive web applications using React and contemporary web technologies with focus on performance and scalability",
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and accessible user interfaces with emphasis on usability, consistency, and user-centered design principles",
    },
    {
      title: "Performance Optimization",
      description: "Analyzing and improving application performance through code optimization, lazy loading, and efficient resource management",
    },
  ];

  return (
    <div style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#1e293b",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
          Our Services
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
          Comprehensive web development solutions tailored to your needs
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
        }}
      >
        {services.map((service, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.borderColor = "#1e293b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: "14px",
              }}
            >
              {service.title}
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div style={{ padding: "80px 24px", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#1e293b",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
          Contact Us
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b" }}>
          Get in touch with our team
        </p>
      </div>

      <div
        style={{
          background: "white",
          padding: "48px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
        }}
      >
        {submitted ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.6rem", color: "#1e293b", marginBottom: "12px", fontWeight: 700 }}>
              Message Sent Successfully
            </h3>
            <p style={{ color: "#64748b" }}>We'll get back to you as soon as possible</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e293b")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e293b")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e293b")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#1e293b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#334155")}
              onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div
      style={{
        padding: "120px 24px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: 800, color: "#1e293b", marginBottom: "16px" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b", marginBottom: "16px" }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "36px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "#1e293b",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: 600,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#334155")}
        onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
      >
        Return Home
      </Link>
    </div>
  );
}

// Main App Component

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;