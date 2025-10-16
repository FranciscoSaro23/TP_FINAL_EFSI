import { createContext, useState, useEffect } from 'react'

export const PresupuestoContext = createContext()

export const PresupuestoProvider = ({ children }) => {
  const [movimientos, setMovimientos] = useState(() => {
    const guardados = localStorage.getItem('movimientos')
    return guardados ? JSON.parse(guardados) : []
  })

  useEffect(() => {
    localStorage.setItem('movimientos', JSON.stringify(movimientos))
  }, [movimientos])

  return (
    <PresupuestoContext.Provider value={{ movimientos, setMovimientos }}>
      {children}
    </PresupuestoContext.Provider>
  )
}
