import { useContext, useMemo, useState } from "react";
import { MovimientosContext } from "../context/MovimientosContext";
import MovimientoItem from "../components/MovimientoItem";
import { Link } from "react-router-dom";
import Filtros from "../components/Filtros";

export default function Listado() {
  const { movimientos } = useContext(MovimientosContext);
  const [filters, setFilters] = useState({
    q: "",
    tipo: "",
    categoria: "",
    desde: "",
    hasta: "",
    min: "",
    max: "",
    orden: "fecha-desc",
  });

  const visibles = useMemo(() => {
    let res = [...movimientos];
    if (filters.q) res = res.filter((m) => m.descripcion.toLowerCase().includes(filters.q.toLowerCase()));
    if (filters.tipo) res = res.filter((m) => m.tipo === filters.tipo);
    if (filters.categoria) res = res.filter((m) => m.categoria === filters.categoria);
    if (filters.desde) res = res.filter((m) => new Date(m.fecha) >= new Date(filters.desde));
    if (filters.hasta) res = res.filter((m) => new Date(m.fecha) <= new Date(filters.hasta));
    if (filters.min !== "") res = res.filter((m) => m.monto >= Number(filters.min));
    if (filters.max !== "") res = res.filter((m) => m.monto <= Number(filters.max));

    const [campo, dir] = filters.orden.split("-");
    res.sort((a, b) => {
      let va = campo === "fecha" ? new Date(a.fecha).getTime() : a.monto;
      let vb = campo === "fecha" ? new Date(b.fecha).getTime() : b.monto;
      return dir === "asc" ? va - vb : vb - va;
    });

    return res;
  }, [movimientos, filters]);

  return (
    <div className="listado-movimientos">
      <div className="listado-header">
        <h2>Movimientos</h2>
        <Link to="/nuevo" className="btn nuevo-btn">+ Nuevo</Link>
      </div>

      <Filtros filters={filters} setFilters={setFilters} />

      {visibles.length === 0 ? (
        <p>No hay movimientos.</p>
      ) : (
        visibles.map((m) => <MovimientoItem key={m.id} movimiento={m} />)
      )}
    </div>
  );
}
