import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState(""); const [mail, setMail] = useState(""); const [contrasenia, setContrasenia] = useState(""); const [error, setError] = useState(""); 
  const navigate = useNavigate();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    try {
      await register({ nombre, mail, contrasenia });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" value={mail} onChange={(e) => setMail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} required />
        <button type="submit">Crear cuenta</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
