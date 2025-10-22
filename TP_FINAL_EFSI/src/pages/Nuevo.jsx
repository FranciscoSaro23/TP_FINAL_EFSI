import React from 'react'
import MovimientoForm from '../components/MovimientoForm'
import { useMovimientos } from '../context/MovimientosContext'

function navigate(to){ window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')) }

export default function Nuevo(){
  const { agregarMovimiento } = useMovimientos()
  const initial = { descripcion: '', categoria: '', tipo: '', monto: '', fecha: '' }

  return (
    <div>
      <h2>Nuevo movimiento</h2>
      <MovimientoForm initialValues={initial} onSubmit={(vals)=>{ agregarMovimiento(vals); navigate('/') }} onCancel={()=>navigate('/')} />
    </div>
  )
}

