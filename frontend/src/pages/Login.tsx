import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  // TODO: chequear si existe el usuario

  const navigate = useNavigate(); // esto es para la ruta
  const location = useLocation(); // esto es para la url
  const { setUser } = useAuth(); // guarda la informacion del usuario --> usuario y contrasenia --> para ver si esta autenticado o si existe 

  // Si venía redirigido desde RequireAuth, tomamos esa ruta
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ mail, contrasenia });
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);
      setUser(res.userId);

      // 👇 redirige a la ruta que intentaba abrir antes del login
      navigate(from, { replace: true }); // TODO: hacer que te rediriga a la ruta viajes directamente, en vez de a la ruta que tocaste antes
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
