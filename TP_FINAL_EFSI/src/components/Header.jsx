import "./Header.css";
import NavLink from "./NavLink";

export default function Header({ toggleTheme, darkMode }) {
  return (
    <header className="header">
      <h1>Mi Presupuesto</h1>
      <button onClick={toggleTheme}>{darkMode ? 'Modo claro' : 'Modo oscuro'}</button>
      <div className="nav-buttons">
        <NavLink to="/">Listado</NavLink>
        <NavLink to="/nuevo">Nuevo</NavLink>
        <NavLink to="/resumen">Resumen</NavLink>
        <NavLink to="/ajustes">Ajustes</NavLink>
      </div>
    </header>
  );
}
