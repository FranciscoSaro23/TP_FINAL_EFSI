import React, { useState } from 'react'

const Nuevo = () => {
  const [tipo, setTipo] = useState('Ingreso')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevo = {
      id: Date.now(),
      tipo,
      descripcion,
      monto: tipo === 'Gasto' ? -Math.abs(Number(monto)) : Math.abs(Number(monto)),
    }

    const almacenados = JSON.parse(localStorage.getItem('movimientos')) || []
    const actualizados = [...almacenados, nuevo]
    localStorage.setItem('movimientos', JSON.stringify(actualizados))

    setDescripcion('')
    setMonto('')
    alert('Movimiento agregado correctamente ✅')
  }

  return (
    <div>
      <h2>Nuevo Movimiento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
        </label>

        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>

        <label>
          Monto:
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default Nuevo
