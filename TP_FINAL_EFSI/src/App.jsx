import React, { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage'

// Componentes de las vistas
import Listado from './pages/Listado'
import Nuevo from './pages/Nuevo'
import Resumen from './pages/Resumen'
import Ajustes from './pages/Ajustes'

const App = () => {
  // 🌙 Tema claro / oscuro guardado en localStorage
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // 🧭 Navegación manual (sin react-router)
  const [ruta, setRuta] = useState('inicio')

  // Cambia el tema global del body
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // Alternar tema
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Render condicional según "ruta"
  const renderVista = () => {
    switch (ruta) {
      case 'inicio':
        return <Listado />
      case 'nuevo':
        return <NuevoMovimiento />
      case 'resumen':
        return <Resumen />
      case 'ajustes':
        return <Ajustes />
      default:
        return <Listado />
    }
  }

  return (
    <div className={`App ${theme}`}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1>💸 Mi Presupuesto</h1>
        <button onClick={toggleTheme} style={styles.btn}>
          Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
        </button>
      </header>

      {/* NAV */}
      <nav style={styles.nav}>
        <button onClick={() => setRuta('inicio')} style={styles.navBtn}>Inicio</button>
        <button onClick={() => setRuta('nuevo')} style={styles.navBtn}>Nuevo</button>
        <button onClick={() => setRuta('resumen')} style={styles.navBtn}>Resumen</button>
        <button onClick={() => setRuta('ajustes')} style={styles.navBtn}>Ajustes</button>
      </nav>

      {/* MAIN */}
      <main style={styles.main}>
        {renderVista()}
      </main>
    </div>
  )
}
export default App
