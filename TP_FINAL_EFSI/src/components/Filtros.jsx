import React from 'react'

export default function Filtros({ filters, setFilters }) {
  function handleChange(e) {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  return (
    <div className="filtros">
      <input
        name="q"
        placeholder="Buscar descripción..."
        value={filters.q}
        onChange={handleChange}
      />

      <select name="tipo" value={filters.tipo} onChange={handleChange}>
        <option value="">Tipo</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>

      <select name="categoria" value={filters.categoria} onChange={handleChange}>
        <option value="">Categoría</option>
        <option>Alimentación</option>
        <option>Transporte</option>
        <option>Ocio</option>
        <option>Sueldo</option>
        <option>Servicios</option>
      </select>

      <input type="date" name="desde" value={filters.desde} onChange={handleChange} />
      <input type="date" name="hasta" value={filters.hasta} onChange={handleChange} />

      <input type="number" name="min" placeholder="Monto mín" value={filters.min} onChange={handleChange} />
      <input type="number" name="max" placeholder="Monto máx" value={filters.max} onChange={handleChange} />

      <select name="orden" value={filters.orden} onChange={handleChange}>
        <option value="fecha-desc">Fecha ↓</option>
        <option value="fecha-asc">Fecha ↑</option>
        <option value="monto-desc">Monto ↓</option>
        <option value="monto-asc">Monto ↑</option>
      </select>
    </div>
  )
}

