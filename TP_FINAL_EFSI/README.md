# TP_FINAL_EFSI
## Mi Presupuesto — TP Final EFSI

Aplicación web para registrar, visualizar y analizar gastos e ingresos personales. Construida con React + Vite, enrutada con React Router y con persistencia en `localStorage`. Incluye filtros, ordenamientos y gráficos con Chart.js (react-chartjs-2) y soporte de tema oscuro.

## Requisitos cumplidos
- **Componentización y props**: componentes reutilizables (`MovimientoForm`, `MovimientoItem`, `Filtros`, `Header`, `NavLink`, `Layout`).
- **Hooks**: `useState`, `useEffect`, `useContext` y hook de contexto `useMovimientos`.
- **Formularios con validaciones**: validación local en `MovimientoForm` (longitud mínima, tipo, monto positivo, fecha no futura).
- **Routing**: `react-router-dom` con rutas `/`, `/nuevo`, `/editar/:id`, `/resumen`, `/ajustes`.
- **Persistencia**: `localStorage` (alta, edición, eliminación y lectura inicial de movimientos; preferencia de tema oscuro/claro).
- **Filtros, búsqueda y ordenamientos**: por descripción, tipo, categoría, rango de fechas y rango de montos; orden por fecha/monto asc/desc.
- **Estado global simple (Context)**: `MovimientosContext` maneja lista, altas, bajas, edición y balance.
- **Gráficos**: Pie (distribución de gastos por categoría) y Línea (evolución mensual del balance).
- **Buenas prácticas**: estructura clara, estilos consistentes, dark mode, navegación evidente.

## Scripts
- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run preview`: sirve el build localmente para verificación.

## Estructura (src)
- `main.jsx`: punto de entrada; monta `App` dentro de `BrowserRouter`.
- `App.jsx`: define rutas dentro de `Layout` y `MovimientosProvider`.
- `Layouts/`
  - `Layout.jsx`: layout general; controla y persiste tema oscuro (agrega clase `dark` al `documentElement`).
  - `Layout.css`: estilos del layout (espaciado superior para header fijo, contenedor principal).
- `components/`
  - `Header.jsx` + `Header.css`: encabezado fijo, título, navegación y botón de tema.
  - `NavLink.jsx`: wrapper de `NavLink` que aplica clase activa a los links.
  - `MovimientoForm.jsx`: formulario controlado con validación local (descripcion, categoría, tipo, monto, fecha). Expone `onSubmit` y `onCancel`.
  - `MovimientoItem.jsx`: tarjeta de cada movimiento con datos y acciones Editar/Eliminar (link a `/editar/:id`).
  - `Filtros.jsx`: UI para búsqueda, tipo, categoría, fechas (desde/hasta), montos (min/max) y orden (fecha/monto asc/desc).
- `pages/`
  - `Listado.jsx`: obtiene movimientos del contexto, aplica filtros/orden con `useMemo` y renderiza `MovimientoItem`.
  - `Nuevo.jsx`: muestra `MovimientoForm` para crear; al guardar agrega y navega a `/`.
  - `Editar.jsx`: toma `:id` desde URL, precarga `MovimientoForm` y actualiza en el contexto.
  - `Resumen.jsx`: calcula totales y muestra gráficos Pie (gastos por categoría) y Línea (evolución mensual del balance) con `react-chartjs-2`.
  - `Ajustes.jsx`: limpieza/restauración de datos en `localStorage` y switch de tema oscuro (persistente).
- `context/`
  - `MovimientosContext.jsx`: lista de movimientos y acciones `agregarMovimiento`, `eliminarMovimiento`, `editarMovimiento`. Calcula `balanceTotal`. Persiste automáticamente en `localStorage`. Expone el hook `useMovimientos`.
- `hooks/`
  - `useLocalStorage.js`: helper genérico para estado persistente (no intrusivo, utilizado como util complementario).
- `index.css` y `App.css`: estilos base, variables CSS para temas, formularios, listas, filtros y botones.

## Rutas
- `/`: listado con filtros/ordenamientos.
- `/nuevo`: alta de movimiento (formulario validado).
- `/editar/:id`: edición de un movimiento por id.
- `/resumen`: totales y gráficos (pie + línea).
- `/ajustes`: limpieza de datos y dark mode.

## Flujo de datos y persistencia
1. Al iniciar, `MovimientosContext` lee `localStorage.movimientos` (o carga un set inicial de ejemplo).
2. Las acciones (`agregar`, `editar`, `eliminar`) actualizan el estado y sincronizan `localStorage` en `useEffect`.
3. El tema se lee de `localStorage.theme` y se aplica al `documentElement` para habilitar variables CSS del modo oscuro.

## Validaciones del formulario (`MovimientoForm`)
- **Descripción**: requerido, mínimo 3 caracteres.
- **Categoría**: requerida.
- **Tipo**: `ingreso` o `gasto`.
- **Monto**: numérico positivo.
- **Fecha**: requerida y no futura (se compara con la fecha actual).

## Lógica de filtros y ordenamiento (`Listado`)
- Búsqueda por texto dentro de la descripción.
- Filtros por tipo, categoría, fecha desde/hasta y monto mínimo/máximo.
- Orden configurable por fecha o monto, ascendente o descendente.
- Todo se resuelve en memoria con `useMemo` para mantener la UI fluida.

## Gráficos (`Resumen`)
- **Pie**: distribución de gastos por categoría (suma de montos con `tipo === 'gasto'`).
- **Línea**: evolución mensual del balance (ingresos suman, gastos restan) agrupado por `YYYY-MM`.

## Cómo correr
1) Instalar dependencias (carpeta `TP_FINAL_EFSI/TP_FINAL_EFSI`):
```
npm i
```
2) Ejecutar dev server:
```
npm run dev
```
3) Abrir la URL que imprime Vite (ejemplo `http://localhost:5175/`).

## Roles del equipo
- **Tommy — Front-End Core y UI/UX**
  - Layout general (`Layout.jsx`/CSS), `Header` y navegación.
  - Sistema de estilos y dark mode (`index.css`, variables de tema, formularios y botones).
  - Ajustes de responsividad y detalles visuales de listas y filtros.

- **Fran — Lógica y Estado Global**
  - `MovimientosContext` (alta/edición/baja, persistencia, `balanceTotal`).
  - Integración de páginas con contexto (`Nuevo`, `Editar`, `Listado`).
  - Lógica de filtros/ordenamientos en `Listado` (combinación de criterios con `useMemo`).

- **Joaqui — Routing, Formularios y Gráficos**
  - Configuración de rutas en `App.jsx` y navegación con `react-router-dom`.
  - `MovimientoForm` (validaciones, UX de formulario, callbacks `onSubmit`/`onCancel`).
  - `Resumen` con gráficos (Pie y Línea) mediante Chart.js (react-chartjs-2).

La carga se repartió equitativamente: UI/Layout, Estado/Filtros y Rutas/Form/Charts. Los tres participaron en pruebas manuales, revisión de código y pulido final.

## Mejoras futuras
- Tests unitarios para helpers de filtros y cálculos.
- Exportar/Importar CSV/JSON.
- Paginación o virtualización de listas grandes.
- i18n y formatos regionales.
- Reemplazar `alert` por toasts no bloqueantes.