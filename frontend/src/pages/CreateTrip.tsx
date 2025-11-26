import React, { useState, useEffect } from "react";
import { createTrip, getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";

export default function CreateTrip() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [administrators, setAdministrators] = useState<User | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("userId");
    if (storedAdmin) {
      const fetchAdmin = async () => {
        try {
          const res = await fetch(
            `http://localhost:4000/api/users/${storedAdmin}`
          );
          if (!res.ok) throw new Error("No se pudo obtener el admin");
          const adminData: User = await res.json();

          setAdministrators(adminData);
          if (!participants.find((p) => p._id === storedAdmin))
            setParticipants([adminData]);
        } catch (e) {
          console.error("Error parsing admin id desde el local storage", e);
        }
      };
      fetchAdmin();
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    //Validacion de que administrators no sea null
    if (!administrators) {
      setError("Debes iniciar sesión para crear un viaje.");
      return;
    }

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
        administrators: [administrators._id],
        participants: participants.map((p) => p._id),
      });
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "No se pudo crear el viaje.");
    }
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }
    try {
      const res = await getUsers(value);
      setResults(res);
    } catch (e) {
      console.error("Error buscando usuarios", e);
    }
  };

  const addParticipant = (user: any) => {
    if (!participants.find((p) => p._id === user._id)) {
      setParticipants([...participants, user]);
    }
    setSearch("");
    setResults([]);
  };

  return (
    <section className="row">
      <form className="card" onSubmit={onSubmit}>
        <h2 style={{ marginTop: 0 }}>Nuevo viaje</h2>

        <label className="label">Titulo</label>
        <input
          className="input"
          placeholder="Titulo del viaje"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">Descripcion</label>
        <input
          className="input"
          placeholder="Descripcion del viaje"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label">Origen</label>
        <input
          className="input"
          placeholder="Ciudad de origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <label className="label">Destino</label>
        <input
          className="input"
          placeholder="Ciudad destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Buscador de participantes */}
        <label className="label">Buscar participantes</label>
        <input
          className="input"
          placeholder="Escribe un nombre..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {results.length > 0 && (
          <div className="dropdown-container">
            <ul className="dropdown-list">
              {results.map((user) => (
                <li
                  key={user._id}
                  className="dropdown-item"
                  onClick={() => addParticipant(user)}
                >
                  {user.nombre}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Participantes ya agregados */}
        {participants.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p>Participantes seleccionados:</p>
            <ul>
              {participants.map((u) => {
                console.log(u);
                return <li key={u._id}>{u.nombre}</li>;
              })}
            </ul>
          </div>
        )}

        {error && (
          <p className="status" style={{ marginTop: 12 }}>
            ⚠️ {error}
          </p>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button className="btn" type="submit">
            Crear
          </button>
          <button className="btn" type="button" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </form>
    </section>
  );
}
