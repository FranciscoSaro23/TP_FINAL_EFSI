import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MovimientoForm from '../components/MovimientoForm'
import { useMovimientos } from '../context/MovimientosContext'

export default function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movimientos, editarMovimiento } = useMovimientos()
  const numericId = Number(id)
  const movimiento = movimientos.find((x) => x.id === numericId)

  if (!movimiento) return <p>Movimiento no encontrado.</p>

  return (
    <div>
      <h2>Editar Movimiento</h2>
      <MovimientoForm
        initialValues={movimiento}
        onSubmit={(vals) => {
          editarMovimiento(numericId, vals)
          navigate('/')
        }}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}