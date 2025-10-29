import { createContext, useState, useEffect, useContext } from "react";

export const MovimientosContext = createContext();

export function useMovimientos() {
  return useContext(MovimientosContext);
}

export default function MovimientosProvider({ children }) {
  const [movimientos, setMovimientos] = useState(
    JSON.parse(localStorage.getItem("movimientos")) || [
      { id: 1, tipo: "ingreso", monto: 5000, categoria: "Sueldo", descripcion: "Pago mensual", fecha: "2025-10-01" },
      { id: 2, tipo: "gasto", monto: 1200, categoria: "Alimentación", descripcion: "Supermercado", fecha: "2025-10-05" },
    ]
  );

  useEffect(() => {
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
  }, [movimientos]);

  const agregarMovimiento = (nuevoMovimiento) => {
    const id = Date.now();
    setMovimientos([...movimientos, { ...nuevoMovimiento, id }]);
  };

  const eliminarMovimiento = (id) => {
    const numericId = typeof id === "string" ? Number(id) : id;
    setMovimientos(movimientos.filter((m) => m.id !== numericId));
  };

  const editarMovimiento = (id, cambios) => {
    const numericId = typeof id === "string" ? Number(id) : id;
    setMovimientos(
      movimientos.map((m) => (m.id === numericId ? { ...m, ...cambios, id: m.id } : m))
    );
  };

  const balanceTotal = movimientos.reduce(
    (acc, m) => (m.tipo === "ingreso" ? acc + m.monto : acc - m.monto),
    0
  );

  return (
    <MovimientosContext.Provider
      value={{ movimientos, agregarMovimiento, eliminarMovimiento, editarMovimiento, balanceTotal }}
    >
      {children}
    </MovimientosContext.Provider>
  );
}
