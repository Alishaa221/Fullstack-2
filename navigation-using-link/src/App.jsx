import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import './App.css';

// ─────────────────────────────────────────────────────────────
// Navigation Component
// ─────────────────────────────────────────────────────────────
function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          Navigation Demo
        </Link>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            About
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Products
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Breadcrumb Component
// ─────────────────────────────────────────────────────────────
function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/" className="breadcrumb-link">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span className="breadcrumb-separator">/</span>
            {isLast ? (
              <span className="breadcrumb-current">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={routeTo} className="breadcrumb-link">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page Components
// ─────────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Home Page</h1>
      <p className="page-description">
        This page demonstrates navigation using the React Router Link component. Click on the navigation links above to navigate between pages without page reload.
      </p>

      <div className="card quick-nav">
        <h2 className="card-title">Quick Navigation</h2>
        <p className="card-text">
          Explore different sections using the links below:
        </p>
        <div className="button-group">
          <Link to="/about" className="btn">
            About Us
          </Link>
          <Link to="/products" className="btn">
            View Products
          </Link>
          <Link to="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Key Features</h3>
        <ul className="feature-list">
          <li>Navigation without page reloads</li>
          <li>Active link highlighting using NavLink</li>
          <li>Breadcrumb navigation support</li>
          <li>Smooth transitions between pages</li>
          <li>Browser history management</li>
        </ul>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page-container narrow">
      <h1 className="page-title">About Page</h1>
      <p className="page-description">
        Learn about React Router Link component and its usage in single-page applications.
      </p>

      <div className="card">
        <h2 className="card-title">React Router Link Component</h2>
        
        <div className="card-content">
          <p>
            The Link component is a fundamental part of React Router that enables navigation between routes without causing a full page reload. It renders an accessible anchor tag with a real href attribute.
          </p>

          <h3 className="section-title">Link vs NavLink</h3>
          <p>
            <strong>Link:</strong> Basic navigation component for routing between pages.
          </p>
          <p>
            <strong>NavLink:</strong> Special version of Link that can style itself as "active" when its route matches the current URL.
          </p>

          <h3 className="section-title">Benefits</h3>
          <ul>
            <li>Prevents full page reloads</li>
            <li>Maintains application state</li>
            <li>Faster navigation experience</li>
            <li>SEO-friendly with proper URLs</li>
            <li>Browser back/forward support</li>
          </ul>
        </div>

        <div className="card-footer">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const products = [
    { id: 1, name: "Product A", category: "Electronics", price: "INR 299" },
    { id: 2, name: "Product B", category: "Clothing", price: "INR59" },
    { id: 3, name: "Product C", category: "Books", price: "INR 19" },
    { id: 4, name: "Product D", category: "Electronics", price: "INR 499" },
    { id: 5, name: "Product E", category: "Home & Garden", price: "INR 129" },
    { id: 6, name: "Product F", category: "Sports", price: "INR 89" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Products Page</h1>
      <p className="page-description">
        Browse our product catalog. Each product card demonstrates Link usage for navigation.
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.id}</div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{product.price}</p>
            <Link to={`/products/${product.id}`} className="btn product-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="back-section">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-container narrow">
      <h1 className="page-title">Contact Page</h1>
      <p className="page-description">
        Get in touch with us using the contact information below.
      </p>

      <div className="card">
        <h2 className="card-title">Contact Information</h2>

        <div className="card-content">
          <div className="contact-item">
            <h3>Email</h3>
            <p>cu@cuchd.in</p>
          </div>

          <div className="contact-item">
            <h3>Phone</h3>
            <p>880XX-9XX0X</p>
          </div>

          <div className="contact-item">
            <h3>Address</h3>
            <p>Main Street</p>
            <p>City, State</p>
          </div>

          <div className="contact-item">
            <h3>Working Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="back-section">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main App Component
// ─────────────────────────────────────────────────────────────

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;