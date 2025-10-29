import { Link } from 'react-router-dom'
import { useMovimientos } from '../context/MovimientosContext'

function MovimientoItem({ movimiento }) {
  const { eliminarMovimiento } = useMovimientos()
  return (
    <li>
      <div>
        <strong>{movimiento.descripcion}</strong> — {movimiento.categoria} — {new Date(movimiento.fecha).toLocaleDateString()}
      </div>
      <div>
        {movimiento.tipo === 'ingreso' ? '🟢' : '🔴'} ${movimiento.monto}
      </div>
      <div>
        <Link className="btn" to={`/editar/${movimiento.id}`}>Editar</Link>
        <button className="btn" onClick={() => eliminarMovimiento(movimiento.id)}>Eliminar</button>
      </div>
    </li>
  )
}

export default MovimientoItem
