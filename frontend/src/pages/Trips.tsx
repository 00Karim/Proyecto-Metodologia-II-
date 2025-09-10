import { useEffect, useState } from "react";
import { listTrips } from "../services/api";
import type { Trip } from "../types";
import { Link } from "react-router-dom";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
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
                <h4>{t.origen} → {t.destino}</h4>
                <p>Creado por: {t.creator?.nombre || t.creator?.mail || '—'}</p>
                <p>Participantes: {t.participantes ? t.participantes.length : 0}</p>
                <Link to={`/trips/${t._id}`} className="btn">Ver detalle</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}