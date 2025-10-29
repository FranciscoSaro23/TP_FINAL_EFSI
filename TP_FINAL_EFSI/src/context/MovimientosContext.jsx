import { createContext, useState, useEffect } from "react";

export const MovimientosContext = createContext();

export default function MovimientosProvider({ children }) {
  const [movimientos, setMovimientos] = useState(
    JSON.parse(localStorage.getItem("movimientos")) || [
      { id: 1, tipo: "ingreso", monto: 5000, categoria: "Sueldo", descripcion: "Pago mensual", fecha: "2025-10-01" },
      { id: 2, tipo: "gasto", monto: 1200, categoria: "Comida", descripcion: "Supermercado", fecha: "2025-10-05" },
    ]
  );

  useEffect(() => {
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
  }, [movimientos]);

  const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, { ...nuevoMovimiento, id: Date.now() }]);
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((m) => m.id !== id));
  };

  const balanceTotal = movimientos.reduce(
    (acc, m) => (m.tipo === "ingreso" ? acc + m.monto : acc - m.monto),
    0
  );

  return (
    <MovimientosContext.Provider
      value={{ movimientos, agregarMovimiento, eliminarMovimiento, balanceTotal }}
    >
      {children}
    </MovimientosContext.Provider>
  );
}
