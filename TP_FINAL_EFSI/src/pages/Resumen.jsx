import React, { useEffect, useState } from 'react'

const Resumen = () => {
  const [ingresos, setIngresos] = useState(0)
  const [gastos, setGastos] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const movimientos = JSON.parse(localStorage.getItem('movimientos')) || []

    const totalIngresos = movimientos
      .filter((m) => m.monto > 0)
      .reduce((acc, m) => acc + m.monto, 0)

    const totalGastos = movimientos
      .filter((m) => m.monto < 0)
      .reduce((acc, m) => acc + Math.abs(m.monto), 0)

    setIngresos(totalIngresos)
    setGastos(totalGastos)
    setBalance(totalIngresos - totalGastos)
  }, [])

  return (
    <div>
      <h2>Resumen</h2>
      <p>💰 Ingresos: ${ingresos}</p>
      <p>💸 Gastos: ${gastos}</p>
      <hr />
      <h3>Balance total: {balance >= 0 ? `✅ $${balance}` : `🔴 -$${Math.abs(balance)}`}</h3>
    </div>
  )
}

export default Resumen
