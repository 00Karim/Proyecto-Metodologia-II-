import React, { useState } from "react";
import { createTrip } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [origen, setOrigen] = useState(""); const [destino, setDestino] = useState(""); const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (origen.trim().length < 2 || destino.trim().length < 2) {
      setError("Origen y destino deben tener al menos 2 caracteres.");
      return;
    }
    try {
      await createTrip({ origen: origen.trim(), destino: destino.trim() });
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "No se pudo crear el viaje.");
    }
  };

  return (
    <section className="row">
      <form className="card" onSubmit={onSubmit}>
        <h2 style={{marginTop:0}}>Nuevo viaje</h2>

        <label className="label">Origen</label>
        <input className="input" placeholder="Ciudad de origen" value={origen} onChange={e => setOrigen(e.target.value)} />

        <label className="label">Destino</label>
        <input className="input" placeholder="Ciudad destino" value={destino} onChange={e => setDestino(e.target.value)} />

        {error && <p className="status" style={{marginTop:12}}>⚠️ {error}</p>}

        <div style={{display:"flex", gap:10, marginTop:14}}>
          <button className="btn" type="submit">Crear</button>
          <button className="btn" type="button" onClick={() => navigate("/")}>Volver</button>
        </div>
      </form>
    </section>
  );
}