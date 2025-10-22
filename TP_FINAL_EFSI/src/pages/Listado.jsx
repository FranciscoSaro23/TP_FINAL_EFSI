import React, { useMemo, useState } from 'react'
import { useMovimientos } from '../context/MovimientosContext'

function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Listado() {
  const { movimientos, eliminarMovimiento } = useMovimientos()
  const [q, setQ] = useState('')
  const [tipo, setTipo] = useState('todos')
  const [orden, setOrden] = useState('fecha_desc')

  const filtrados = useMemo(() => {
    let arr = movimientos.slice()
    if (tipo !== 'todos') arr = arr.filter(m => m.tipo === tipo)
    if (q) arr = arr.filter(m => m.descripcion.toLowerCase().includes(q.toLowerCase()))

    switch (orden) {
      case 'fecha_asc':
        arr.sort((a, b) => a.fecha.localeCompare(b.fecha))
        break
      case 'monto_asc':
        arr.sort((a, b) => a.monto - b.monto)
        break
      case 'monto_desc':
        arr.sort((a, b) => b.monto - a.monto)
        break
      default:
        arr.sort((a, b) => b.fecha.localeCompare(a.fecha))
    }

    return arr
  }, [movimientos, q, tipo, orden])

  return (
    <div>
      <h2>Movimientos</h2>
      <div className="controls">
        <input
          placeholder="Buscar..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="ingreso">Ingresos</option>
          <option value="gasto">Gastos</option>
        </select>
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="fecha_desc">Fecha ↓</option>
          <option value="fecha_asc">Fecha ↑</option>
          <option value="monto_desc">Monto ↓</option>
          <option value="monto_asc">Monto ↑</option>
        </select>
        <button className="btn" onClick={() => navigate('/nuevo')}>+ Nuevo</button>
      </div>

      {filtrados.length === 0 ? (
        <p>No hay movimientos.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(m => (
              <tr key={m.id}>
                <td>{m.descripcion}</td>
                <td>{m.categoria}</td>
                <td>{m.tipo}</td>
                <td>${m.monto}</td>
                <td>{m.fecha}</td>
                <td>
                  <button className="link" onClick={() => navigate(`/editar?id=${m.id}`)}>Editar</button>
                  <button
                    className="link danger"
                    onClick={() => {
                      if (confirm('¿Eliminar este movimiento?')) eliminarMovimiento(m.id)
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
