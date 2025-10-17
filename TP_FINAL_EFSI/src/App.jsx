import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Listado from './components/Listado';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light'); 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
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
  );
};

export default App;
