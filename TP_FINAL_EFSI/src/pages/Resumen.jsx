import React, { useMemo } from 'react'
import { useMovimientos } from '../context/MovimientosContext'
import { Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale)

const Resumen = () => {
  const { movimientos } = useMovimientos()

  const { ingresos, gastos, balance } = useMemo(() => {
    const ingresos = movimientos.filter(m => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0)
    const gastos = movimientos.filter(m => m.tipo === 'gasto').reduce((a, m) => a + m.monto, 0)
    return { ingresos, gastos, balance: ingresos - gastos }
  }, [movimientos])

  const pieData = useMemo(() => {
    const gastosPorCategoria = movimientos
      .filter(m => m.tipo === 'gasto')
      .reduce((acc, m) => {
        acc[m.categoria] = (acc[m.categoria] || 0) + m.monto
        return acc
      }, {})
    const labels = Object.keys(gastosPorCategoria)
    const data = Object.values(gastosPorCategoria)
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
    return {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, labels.length) }]
    }
  }, [movimientos])

  const monthlyData = useMemo(() => {
    const byMonth = new Map()
    movimientos.forEach(m => {
      const d = new Date(m.fecha)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const prev = byMonth.get(key) || 0
      const delta = m.tipo === 'ingreso' ? m.monto : -m.monto
      byMonth.set(key, prev + delta)
    })
    const labels = Array.from(byMonth.keys()).sort()
    const data = labels.map(k => byMonth.get(k))
    return {
      labels,
      datasets: [{ label: 'Balance mensual', data, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }]
    }
  }, [movimientos])

  return (
    <div>
      <h2>Resumen</h2>
      <p>💰 Ingresos: ${ingresos}</p>
      <p>💸 Gastos: ${gastos}</p>
      <hr />
      <h3>Balance total: {balance >= 0 ? `✅ $${balance}` : `🔴 -$${Math.abs(balance)}`}</h3>

      <div style={{ maxWidth: 480 }}>
        <h4>Gastos por categoría</h4>
        <Pie data={pieData} />
      </div>

      <div style={{ maxWidth: 720 }}>
        <h4>Evolución mensual</h4>
        <Line data={monthlyData} />
      </div>
    </div>
  )
}

export default Resumen
