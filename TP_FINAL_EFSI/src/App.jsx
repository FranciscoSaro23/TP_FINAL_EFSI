import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import MovimientosProvider from "./context/MovimientosContext";
import Resumen from "./pages/Resumen";
import Listado from "./pages/Listado";
import Nuevo from "./pages/Nuevo";
import Editar from "./pages/Editar";
import Ajustes from "./pages/Ajustes";

export default function App() {
  return (
    <MovimientosProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Listado />} />
          <Route path="/nuevo" element={<Nuevo />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </Layout>
    </MovimientosProvider>
  );
}
