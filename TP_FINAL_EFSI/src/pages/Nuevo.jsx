import React from 'react'
import { useNavigate } from 'react-router-dom'
import MovimientoForm from '../components/MovimientoForm'
import { useMovimientos } from '../context/MovimientosContext'

export default function Nuevo() {
  const { agregarMovimiento } = useMovimientos()
  const navigate = useNavigate()

  return (
    <div className="nuevo-movimiento">
      <h2>Agregar nuevo movimiento</h2>
      <MovimientoForm
        onSubmit={(vals) => {
          agregarMovimiento(vals)
          navigate('/')
        }}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
