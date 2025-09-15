import React, { useState } from "react";
import { createTrip, getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { User } from "../types"

export default function CreateTrip() {
  const [origin, setOrigin] = useState(""); const [destination, setDestination] = useState("");  const [title, setTitle] = useState("");  const [description, setDescription] = useState(""); const [participants, setParticipants] = useState<User[]>([]); const [search, setSearch] = useState(""); const [results, setResults] = useState<User[]>([]); const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (origin.trim().length < 5 || destination.trim().length < 5) {
      setError("Origen y destino deben tener al menos 5 caracteres.");
      return;
    }
    try {
      await createTrip({ 
        title: title.trim(), 
        description: description.trim(), 
        origin: origin.trim(), 
        destination: destination.trim(), 
        participants: participants.map(p => p._id)
      });
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "No se pudo crear el viaje.");
    }
  };

  const handleSearch = async(value: string) => {
    setSearch(value);
    if(value.length < 3){
      setResults([]);
      return;
    }
    try{
      const res = await getUsers(value);
      setResults(res);
    }catch(e){
      console.error("Error buscando usuarios", e)
    }
  }

  const addParticipant = (user: any) => {
    if(!participants.find(p => p._id === user._id)){
      setParticipants([...participants, user])
    }
    setSearch("")
    setResults([])
  }

  return (
    <section className="row">
      <form className="card" onSubmit={onSubmit}>
        <h2 style={{marginTop:0}}>Nuevo viaje</h2>

        <label className="label">Titulo</label>
        <input className="input" placeholder="Titulo del viaje" value={title} onChange={e => setTitle(e.target.value)} />

        <label className="label">Descripcion</label>
        <input className="input" placeholder="Descripcion del viaje" value={description} onChange={e => setDescription(e.target.value)} />

        <label className="label">Origen</label>
        <input className="input" placeholder="Ciudad de origen" value={origin} onChange={e => setOrigin(e.target.value)} />

        <label className="label">Destino</label>
        <input className="input" placeholder="Ciudad destino" value={destination} onChange={e => setDestination(e.target.value)} />

        {/* 🔎 Buscador de participantes */}
        <label className="label">Buscar participantes</label>
        <input
          className="input"
          placeholder="Escribe un nombre..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />

        {results.length > 0 && (
          <ul className="dropdown">
            {results.map(user => (
              <li key={user._id} onClick={() => addParticipant(user)}>
                {user.nombre}
              </li>
            ))}
          </ul>
        )}

        {/* 👥 Participantes ya agregados */}
        {participants.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p>Participantes seleccionados:</p>
            <ul>
              {participants.map(u => (
                <li key={u._id}>{u.nombre}</li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="status" style={{marginTop:12}}>⚠️ {error}</p>}

        <div style={{display:"flex", gap:10, marginTop:14}}>
          <button className="btn" type="submit">Crear</button>
          <button className="btn" type="button" onClick={() => navigate("/")}>Volver</button>
        </div>
      </form>
    </section>
  );
}