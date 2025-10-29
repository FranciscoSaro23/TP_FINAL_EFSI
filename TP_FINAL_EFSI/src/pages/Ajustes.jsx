import React, { useEffect, useState } from 'react'
import { useMovimientos } from '../context/MovimientosContext'

const MOCK = [
  { id: 101, tipo: 'ingreso', monto: 5000, categoria: 'Sueldo', descripcion: 'Pago mensual', fecha: '2025-10-01' },
  { id: 102, tipo: 'gasto', monto: 1200, categoria: 'Alimentación', descripcion: 'Supermercado', fecha: '2025-10-05' },
  { id: 103, tipo: 'gasto', monto: 800, categoria: 'Transporte', descripcion: 'Combustible', fecha: '2025-10-08' }
]

const Ajustes = () => {
  const { } = useMovimientos()
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const borrarDatos = () => {
    localStorage.removeItem('movimientos')
    alert('Todos los movimientos fueron eliminados ❌')
    window.location.reload()
  }

  const restaurarMock = () => {
    localStorage.setItem('movimientos', JSON.stringify(MOCK))
    alert('Datos iniciales restaurados ✅')
    window.location.reload()
  }

  const toggleTheme = () => {
    const newTheme = dark ? 'light' : 'dark'
    setDark(!dark)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div>
      <h2>Ajustes</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={borrarDatos}>Borrar todos los movimientos</button>
        <button onClick={restaurarMock}>Restaurar datos de ejemplo</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={dark} onChange={toggleTheme} /> Tema oscuro
        </label>
      </div>
    </div>
  )
}

export default Ajustes
