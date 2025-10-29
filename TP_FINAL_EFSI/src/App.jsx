import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import MovimientosProvider from "./context/MovimientosContext";
import Resumen from "./pages/Resumen";
import Listado from "./pages/Listado";
import Nuevo from "./pages/Nuevo";

export default function App() {
  return (
    <MovimientosProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Resumen />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/nuevo" element={<Nuevo />} />
        </Routes>
      </Layout>
    </MovimientosProvider>
  );
}
