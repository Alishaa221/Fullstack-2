import { useState } from "react";
import "./App.css";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`container ${dark ? "dark" : "light"}`}>
      <h2>Theme Toggle SPA</h2>
      <button onClick={() => setDark(!dark)}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
