import { useState } from 'react'
import Header from './components/Header'
import Listado from './pages/Listado'
import Nuevo from './pages/Nuevo'
import Editar from './pages/Editar'
import Resumen from './pages/Resumen'
import Ajustes from './pages/Ajustes'

function App() {
  const [ruta, setRuta] = useState('/') // navegación manual simple

  const renderPage = () => {
    switch (ruta) {
      case '/nuevo': return <Nuevo cambiarRuta={setRuta} />
      case '/editar': return <Editar cambiarRuta={setRuta} />
      case '/resumen': return <Resumen cambiarRuta={setRuta} />
      case '/ajustes': return <Ajustes cambiarRuta={setRuta} />
      default: return <Listado cambiarRuta={setRuta} />
    }
  }

  return (
    <div>
      <Header cambiarRuta={setRuta} />
      <main>{renderPage()}</main>
    </div>
  )
}

export default App
