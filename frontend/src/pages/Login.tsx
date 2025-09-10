import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); 
  const { setUser } = useAuth();

  // Si venía redirigido desde RequireAuth, tomamos esa ruta
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ mail, contrasenia });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      // 👇 redirige a la ruta que intentaba abrir antes del login
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
