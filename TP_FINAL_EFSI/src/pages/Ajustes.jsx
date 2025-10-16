import React from 'react'
import movimiento from '../components/MovimientoItem'
const Ajustes = () => {
  const borrarDatos = () => {
    localStorage.removeItem('movimientos')
    alert('Todos los movimientos fueron eliminados ❌')
  }

  const restaurarMock = () => {
    localStorage.setItem('movimientos', JSON.stringify(movimiento))
    alert('Datos iniciales restaurados ✅')
  }

  return (
    <div>
      <h2>Ajustes</h2>
      <button onClick={borrarDatos}>Borrar todos los movimientos</button>
      <button onClick={restaurarMock}>Restaurar datos de ejemplo</button>
    </div>
  )
}

export default Ajustes
