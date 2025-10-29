import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Layout.css";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`layout ${darkMode ? "dark" : "light"}`}>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <main className="main-content">{children}</main>
    </div>
  );
}
