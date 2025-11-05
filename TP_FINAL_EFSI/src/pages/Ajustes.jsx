import React from 'react'
import { useMovimientos } from '../context/MovimientosContext'
import { useTheme } from '../context/ThemeContext'

const MOCK = [
  { id: 101, tipo: 'ingreso', monto: 5000, categoria: 'Sueldo', descripcion: 'Pago mensual', fecha: '2025-10-01' },
  { id: 102, tipo: 'gasto', monto: 1200, categoria: 'Alimentación', descripcion: 'Supermercado', fecha: '2025-10-05' },
  { id: 103, tipo: 'gasto', monto: 800, categoria: 'Transporte', descripcion: 'Combustible', fecha: '2025-10-08' }
]

const Ajustes = () => {
  const { setMovimientos } = useMovimientos()
  const { darkMode, toggleTheme } = useTheme()

  const borrarDatos = () => {
    setMovimientos([])
    alert('Todos los movimientos fueron eliminados ❌')
  }

  const restaurarMock = () => {
    setMovimientos(MOCK)
    alert('Datos iniciales restaurados ✅')
  }

  return (
    <div className="page-centered">
      <h2>Ajustes</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={borrarDatos}>Borrar todos los movimientos</button>
        <button onClick={restaurarMock}>Restaurar datos de ejemplo</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} /> Tema oscuro
        </label>
      </div>
    </div>
  )
}

export default Ajustes
