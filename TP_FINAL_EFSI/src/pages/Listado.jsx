import { useContext } from 'react'
import { PresupuestoContext } from '../context/PresupuestoContext'
import MovimientoItem from '../components/MovimientoItem'

function Listado({ cambiarRuta }) {
  const { movimientos } = useContext(PresupuestoContext)

  return (
    <section className="listado">
      <h2>Movimientos</h2>
      {movimientos.length === 0 ? (
        <p>No hay movimientos aún.</p>
      ) : (
        <ul>
          {movimientos.map((m) => (
            <MovimientoItem key={m.id} movimiento={m} />
          ))}
        </ul>
      )}
      <button onClick={() => cambiarRuta('/nuevo')}>+ Agregar Movimiento</button>
    </section>
  )
}

export default Listado
