import { useState } from "react";
import "./Header.css";

export default function Header({ toggleTheme, darkMode }) {
  const [active, setActive] = useState("home");

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Mi Sitio</h1>

        <nav className="nav">
          {["home", "sobre mí", "contacto"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`nav-item ${active === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button onClick={toggleTheme} className="theme-button">
          {darkMode ? "CLARO" : "OSCURO"}
        </button>
      </div>
    </header>
  );
}