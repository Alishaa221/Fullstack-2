import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");            // for typing
  const [submittedName, setSubmittedName] = useState(""); // for submit

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);   // update ONLY on submit
  };

  return (
    <div className="app-wrapper">
      <div className="card shadow-lg custom-card">
        <h3 className="text-center mb-3">Bootstrap UI Demo</h3>
        <p className="text-center text-muted mb-4">
          Simple React form with enhanced UI
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        {/* Show message ONLY after submit */}
        {submittedName && (
          <div className="alert alert-success text-center mt-3">
            Hello, <strong>{submittedName}</strong> 👋
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
