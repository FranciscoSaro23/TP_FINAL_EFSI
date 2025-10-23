import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Listado from './pages/Listado';
import { MovimientosProvider } from './context/MovimientosContext';

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
