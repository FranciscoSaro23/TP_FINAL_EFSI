import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import MovimientosProvider from "./context/MovimientosContext";
import Resumen from "./pages/Resumen";
import Nuevo from "./pages/Nuevo";
import Listado from "./pages/Listado";

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light'); 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
    <MovimientosProvider>
      <div className={`App ${theme}`}>
        <header>
          <h1>Mi Aplicación</h1>
          <button onClick={toggleTheme}>Cambiar Tema</button>
        </header>
        <nav>
          <ul>
            <li>Inicio</li>
            <li>Listado</li>
          </ul>
        </nav>
        <main>
          <Listado />
        </main>
      </div>
    </MovimientosProvider>
  );
};

export default App;
