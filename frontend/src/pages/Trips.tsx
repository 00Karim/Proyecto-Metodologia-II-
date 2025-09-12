import { useEffect, useState } from "react";
import { listTrips } from "../services/api";
import type { Trip } from "../types";
import { Link } from "react-router-dom";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]); // en esta variable de estado guardamos los trips que vienen del back
  const [loading, setLoading] = useState(true); // con esta variable nos aseguramos de mostrar la lista una vez que se haya cargado todos los trips correctamente y en el mientas tanto se muestra un texto que dice cargando
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await listTrips();
        if (alive) setTrips(data);
      } catch (err: any) {
        setError(err?.message || "No se pudo cargar la lista");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div className="card status">Cargando viajes...</div>;
  if (error) return <div className="card status">Error: {error}</div>;
  console.log(trips)
  return (
    <section className="row">
      <div className="card">
        <h2 style={{marginTop:0}}>Viajes</h2>
        {trips.length === 0 ? (
          <p className="status">Aún no hay viajes. Usa <b>Crear viaje</b> para agregar uno.</p>
        ) : (
          <ul className="list">
            {trips.map((t: any) => (
              <li key={t._id} className="item">
                <h4>{t.origin} → {t.destination}</h4>
                <p>Creado por: {t.administrators[0]?.nombre || t.administrators[0]?.mail || '—'}</p>
                <p>Participantes: {t.participants ? t.participants.length : 0}</p>
                <Link to={`/trips/${t._id}`} className="btn">Ver detalle</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}