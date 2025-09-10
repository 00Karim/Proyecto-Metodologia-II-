import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrip, joinTrip, createActivity, voteActivity } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function TripDetail() {
  const { id } = useParams<{id?: string}>();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(""); const [desc, setDesc] = useState(""); 
  const { user } = useAuth();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getTrip(id!);
        if (alive) setTrip(data);
      } catch (err: any) {
        setError(err?.message || "No se pudo cargar el viaje");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleJoin = async () => {
    try {
      await joinTrip(id!);
      const data = await getTrip(id!);
      setTrip(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "No se pudo unirse");
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createActivity(id!, { nombre: name, descripcion: desc });
      const data = await getTrip(id!);
      setTrip(data);
      setName(""); setDesc(""); 
    } catch (err: any) {
      setError(err?.response?.data?.message || "No se pudo crear la actividad");
    }
  };

  const handleVote = async (activityId: string) => {
    try {
      await voteActivity(id!, activityId);
      const data = await getTrip(id!);
      setTrip(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "No se pudo votar");
    }
  };

  if (loading) return <div className="card status">Cargando viaje...</div>;
  if (error) return <div className="card status">Error: {error}</div>;
  if (!trip) return <div className="card status">Viaje no encontrado</div>;

  const amIParticipant = trip.participantes?.some((p: any) => p._id === user?._id);

  return (
    <div className="card">
      <h2>{trip.origen} → {trip.destino}</h2>
      <p>Creado por: {trip.creator?.nombre || trip.creator?.mail}</p>
      <p>Participantes: {trip.participantes?.length || 0}</p>

      {!amIParticipant ? (
        <button className="btn" onClick={handleJoin}>Unirme al viaje</button>
      ) : (
        <p className="status">Ya sos participante</p>
      )}

      <hr style={{margin:'16px 0'}} />

      <h3>Actividades</h3>
      <ul className="list">
        {trip.actividades && trip.actividades.length > 0 ? (
          trip.actividades.map((a: any) => (
            <li key={a._id} className="item">
              <h4>{a.nombre}</h4>
              <p>{a.descripcion}</p>
              <p>Votos: {a.votos || 0}</p>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <button className="btn" onClick={() => handleVote(a._id)}>Votar</button>
              </div>
            </li>
          ))
        ) : (
          <p className="status">Aún no hay actividades.</p>
        )}
      </ul>

      {amIParticipant && (
        <form onSubmit={handleAddActivity} style={{marginTop:12}}>
          <label className="label">Nombre</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} required />
          <label className="label">Descripción</label>
          <textarea className="textarea" value={desc} onChange={e => setDesc(e.target.value)} required />
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="btn" type="submit">Agregar actividad</button>
          </div>
        </form>
      )}

    </div>
  );
}