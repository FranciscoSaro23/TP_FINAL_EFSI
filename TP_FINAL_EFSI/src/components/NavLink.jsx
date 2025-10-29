import { NavLink as RouterLink } from "react-router-dom";

export default function NavLink({ to, children }) {
  return (
    <RouterLink
      to={to}
      className={({ isActive }) =>
        isActive ? "btn active" : "btn"
      }
    >
      {children}
    </RouterLink>
  );
}
  