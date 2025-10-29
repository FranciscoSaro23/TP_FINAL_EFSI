import { useContext } from "react";
import { MovimientosContext } from "../context/MovimientosContext";
import MovimientoItem from "../components/MovimientoItem";
import { Link } from "react-router-dom";

export default function Listado() {
  const { movimientos } = useContext(MovimientosContext);

  return (
    <div className="listado-movimientos">
      <div className="listado-header">
        <h2>Movimientos</h2>
        <Link to="/nuevo" className="btn nuevo-btn">+ Nuevo</Link>
      </div>

      {movimientos.length === 0 ? (
        <p>No hay movimientos.</p>
      ) : (
        movimientos.map((m) => <MovimientoItem key={m.id} movimiento={m} />)
      )}
    </div>
  );
}
