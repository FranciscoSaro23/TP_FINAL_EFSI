import React from 'react'
import MovimientoForm from '../components/MovimientoForm'
import { useMovimientos } from '../context/MovimientosContext'

function getId() {
  const params = new URLSearchParams(window.location.search)
  return params.get('id')
}

function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Editar() {
  const { movimientos, editarMovimiento } = useMovimientos()
  const id = getId()
  const m = movimientos.find(x => x.id === id)

  if (!m) return <p>Movimiento no encontrado.</p>

  return (
    <div>
      <h2>Editar Movimiento</h2>
      <MovimientoForm
        initialValues={m}
        onSubmit={(vals) => {
          editarMovimiento(id, vals)
          navigate('/')
        }}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}