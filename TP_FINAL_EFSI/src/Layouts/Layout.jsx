import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Layout.css";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
function LayoutContent({ children }) {
  const { darkMode } = useTheme();
  return (
    <div className={`layout ${darkMode ? "dark" : "light"}`}>
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
