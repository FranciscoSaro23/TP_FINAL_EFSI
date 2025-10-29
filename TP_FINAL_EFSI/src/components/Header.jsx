import { useState } from "react";
import "./Header.css";
import NavLink from "./NavLink";

export default function Header({ toggleTheme }) {
  return (
    <header className="header">
      <h1>Mi Aplicación</h1>
      <button onClick={toggleTheme}>Cambiar Tema</button>
      <div className="nav-buttons">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/listado">Listado</NavLink>
      </div>
    </header>
  );
}
