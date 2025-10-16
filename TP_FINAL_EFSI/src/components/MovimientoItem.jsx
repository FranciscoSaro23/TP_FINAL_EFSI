function MovimientoItem({ movimiento }) {
  return (
    <li>
      <strong>{movimiento.descripcion}</strong> — 
      {movimiento.tipo === 'ingreso' ? '🟢' : '🔴'} ${movimiento.monto} 
      ({movimiento.categoria})
    </li>
  )
}

export default MovimientoItem
