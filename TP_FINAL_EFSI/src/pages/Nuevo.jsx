import React from 'react'
import MovimientoForm from '../components/MovimientoForm'
import { useMovimientos } from '../context/MovimientosContext'

import MovimientoForm from "../components/MovimientoForm";

export default function Nuevo() {
  return (
    <div className="nuevo-movimiento">
      <h2>Agregar nuevo movimiento</h2>
      <MovimientoForm />
    </div>
  );
}
