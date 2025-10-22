import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import "./Layout.css";

export default function Layout({ children }) {
  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`layout ${darkMode ? "dark" : "light"}`}>

      <Header toggleTheme={toggleTheme} darkMode={darkMode} />

      <div className="content-wrapper">

        {typeof Sidebar !== "undefined" && <Sidebar />}

        <main className="main-content">{children}</main>
      </div>
      
      {typeof Footer !== "undefined" && <Footer />}
    </div>
  );
}
