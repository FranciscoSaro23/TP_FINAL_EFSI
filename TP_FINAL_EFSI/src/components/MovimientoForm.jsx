import React, { useState } from 'react'

function validar(vals){
  const errors = {}
  if (!vals.descripcion || vals.descripcion.trim().length < 3) errors.descripcion = 'Descripción (min 3)'
  if (!vals.categoria) errors.categoria = 'Categoría requerida'
  if (!['ingreso','gasto'].includes(vals.tipo)) errors.tipo = 'Tipo requerido'
  if (vals.monto === '' || isNaN(Number(vals.monto)) || Number(vals.monto) <= 0) errors.monto = 'Monto positivo'
  if (!vals.fecha) errors.fecha = 'Fecha requerida'
  else {
    const f = new Date(vals.fecha)
    const hoy = new Date()
    hoy.setHours(0,0,0,0)
    if (f > hoy) errors.fecha = 'No puede ser futura'
  }
  return errors
}

export default function MovimientoForm({ initialValues, onSubmit, onCancel }){
  const [vals, setVals] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleSubmit(e){
    e.preventDefault()
    const errs = validar(vals)
    setErrors(errs)
    if (Object.keys(errs).length === 0){

      onSubmit({ ...vals, monto: Number(vals.monto) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Descripción
        <input value={vals.descripcion} onChange={e=>setVals({...vals, descripcion: e.target.value})} />
        {errors.descripcion && <small className="error">{errors.descripcion}</small>}
      </label>

      <label>Categoría
        <select value={vals.categoria} onChange={e=>setVals({...vals, categoria: e.target.value})}>
          <option value="">Seleccionar</option>
          <option>Alimentación</option>
          <option>Transporte</option>
          <option>Ocio</option>
          <option>Sueldo</option>
          <option>Servicios</option>
        </select>
        {errors.categoria && <small className="error">{errors.categoria}</small>}
      </label>

      <label>Tipo
        <select value={vals.tipo} onChange={e=>setVals({...vals, tipo: e.target.value})}>
          <option value="">Seleccionar</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {errors.tipo && <small className="error">{errors.tipo}</small>}
      </label>

      <label>Monto
        <input type="number" value={vals.monto} onChange={e=>setVals({...vals, monto: e.target.value})} />
        {errors.monto && <small className="error">{errors.monto}</small>}
      </label>

      <label>Fecha
        <input type="date" value={vals.fecha} onChange={e=>setVals({...vals, fecha: e.target.value})} />
        {errors.fecha && <small className="error">{errors.fecha}</small>}
      </label>

      <div className="formActions">
        <button className="btn" type="submit">Guardar</button>
        <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}