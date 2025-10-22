import React, { useState } from 'react'

function validar(vals) {
  const errors = {}
  if (!vals.descripcion || vals.descripcion.trim().length < 3)
    errors.descripcion = 'La descripción debe tener al menos 3 caracteres.'
  if (!vals.categoria)
    errors.categoria = 'Debes seleccionar una categoría.'
  if (!['ingreso', 'gasto'].includes(vals.tipo))
    errors.tipo = 'Debes elegir tipo ingreso o gasto.'
  if (vals.monto === '' || isNaN(Number(vals.monto)) || Number(vals.monto) <= 0)
    errors.monto = 'El monto debe ser un número positivo.'
  if (!vals.fecha)
    errors.fecha = 'La fecha es obligatoria.'
  else {
    const f = new Date(vals.fecha)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    if (f > hoy) errors.fecha = 'La fecha no puede ser futura.'
  }
  return errors
}

export default function MovimientoForm({ initialValues, onSubmit, onCancel }) {
  const [vals, setVals] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setVals({ ...vals, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validar(vals)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onSubmit({ ...vals, monto: Number(vals.monto) })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Descripción
        <input
          name="descripcion"
          value={vals.descripcion}
          onChange={handleChange}
          placeholder="Ej: Supermercado"
        />
        {errors.descripcion && <small className="error">{errors.descripcion}</small>}
      </label>

      <label>
        Categoría
        <select name="categoria" value={vals.categoria} onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option>Alimentación</option>
          <option>Transporte</option>
          <option>Ocio</option>
          <option>Sueldo</option>
          <option>Servicios</option>
        </select>
        {errors.categoria && <small className="error">{errors.categoria}</small>}
      </label>

      <label>
        Tipo
        <select name="tipo" value={vals.tipo} onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {errors.tipo && <small className="error">{errors.tipo}</small>}
      </label>

      <label>
        Monto
        <input
          name="monto"
          type="number"
          value={vals.monto}
          onChange={handleChange}
        />
        {errors.monto && <small className="error">{errors.monto}</small>}
      </label>

      <label>
        Fecha
        <input
          name="fecha"
          type="date"
          value={vals.fecha}
          onChange={handleChange}
        />
        {errors.fecha && <small className="error">{errors.fecha}</small>}
      </label>

      <div className="formActions">
        <button type="submit" className="btn">Guardar</button>
        <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
