import React, { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const MovimientosContext = createContext()

export function MovimientosProvider({ children }) {
  const [movimientos, setMovimientos] = useLocalStorage('movimientos', [])

  const agregarMovimiento = (movimiento) => {
    const nuevoMovimiento = {
      ...movimiento,
      id: Date.now().toString(),
      fecha: new Date().toISOString().split('T')[0]
    }
    setMovimientos(prev => [...prev, nuevoMovimiento])
  }

  const editarMovimiento = (id, datos) => {
    setMovimientos(prev => 
      prev.map(m => m.id === id ? { ...m, ...datos } : m)
    )
  }

  const eliminarMovimiento = (id) => {
    setMovimientos(prev => prev.filter(m => m.id !== id))
  }

  const obtenerMovimiento = (id) => {
    return movimientos.find(m => m.id === id)
  }

  const value = {
    movimientos,
    agregarMovimiento,
    editarMovimiento,
    eliminarMovimiento,
    obtenerMovimiento
  }

  return (
    <MovimientosContext.Provider value={value}>
      {children}
    </MovimientosContext.Provider>
  )
}

export function useMovimientos() {
  const context = useContext(MovimientosContext)
  if (!context) {
    throw new Error('useMovimientos debe ser usado dentro de MovimientosProvider')
  }
  return context
}
