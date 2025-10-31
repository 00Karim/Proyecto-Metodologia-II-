import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TripDetail from "./pages/TripDetail";
import MyTrips from "./pages/MyTrips";
import { useAuth } from "./hooks/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirige al login y guarda la ruta original en "state.from"
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="brand">🌍 TripMate</div>
        <div className="links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Viajes
          </NavLink>
          <NavLink to="/nuevo" className={({ isActive }) => (isActive ? "active" : "")}>
            Crear viaje
          </NavLink>
          {user ? (
            <>
              <NavLink to="/my-trips" className={({ isActive }) => (isActive ? "active" : "")}>
                Tus viajes
              </NavLink>
              <span style={{ marginLeft: 10 }}>Hola, {user.nombre || user.mail}</span>
              <button className="btn" style={{ marginLeft: 10 }} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                Registro
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Trips />} />
          <Route
            path="/nuevo"
            element={
              <RequireAuth>
                <CreateTrip />
              </RequireAuth>
            }
          />
          <Route path="/my-trips" element={<RequireAuth><MyTrips /></RequireAuth>} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <small>Frontend Vite + React + TS</small>
      </footer>
    </div>
  );
}

