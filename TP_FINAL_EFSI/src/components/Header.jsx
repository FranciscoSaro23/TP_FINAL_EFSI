function Header({ cambiarRuta }) {
  return (
    <header className="header">
      <h1>💰 Mi Presupuesto</h1>
      <nav>
        <button onClick={() => cambiarRuta('/')}>Listado</button>
        <button onClick={() => cambiarRuta('/nuevo')}>Nuevo</button>
        <button onClick={() => cambiarRuta('/resumen')}>Resumen</button>
        <button onClick={() => cambiarRuta('/ajustes')}>Ajustes</button>
      </nav>
    </header>
  )
}
export default Header
