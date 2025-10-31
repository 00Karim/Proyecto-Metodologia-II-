import { useEffect, useState } from "react";
import { listTrips } from "../services/api";
import type { Trip } from "../types";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // determine user id from context (support string or object)
  const getUserId = () => {
    if (!user) return null;
    if (typeof user === "string") return user;
    return (user as any)._id || (user as any).id || (user as any).userId || (user as any);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await listTrips();
        if (!alive) return;
        setTrips(data || []);
      } catch (err: any) {
        setError(err?.message || "Error al cargar viajes");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const userId = getUserId();

  const isParticipant = (t: any) => {
    if (!userId) return false;
    const p = t.participants;
    if (!p) return false;
    // participants might be array of ids or objects
    return p.some((x: any) => x === userId || x._id === userId || x.id === userId || x.userId === userId);
  };

  const created = trips.filter((t: any) => {
    return userId && (t.creatorId === userId || t.creatorId === (user as any)?._id);
  });

  const participating = trips.filter((t: any) => {
    return userId && isParticipant(t) && !(t.creatorId === userId || t.creatorId === (user as any)?._id);
  });

  return (
    <section>
      <h2>Tus viajes</h2>
      <div className="my-trips-container">
        <section>
          <h3>Creados por vos</h3>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : created.length === 0 ? (
            <p>No has creado viajes aún.</p>
          ) : (
            <ul className="list">
              {created.map((t: any) => (
                <li key={t._id} className="item">
                  <h4>{t.origin} → {t.destination}</h4>
                  <p>Participantes: {t.participants ? t.participants.length : 0}</p>
                  <Link to={`/trips/${t._id}`} className="btn">Ver detalle</Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section style={{ marginTop: 20 }}>
          <h3>En los que participás</h3>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : participating.length === 0 ? (
            <p>No estás participando en viajes aún.</p>
          ) : (
            <ul className="list">
              {participating.map((t: any) => (
                <li key={t._id} className="item">
                  <h4>{t.origin} → {t.destination}</h4>
                  <p>Creado por: {t.administrators?.[0]?.nombre || t.administrators?.[0]?.mail || '—'}</p>
                  <Link to={`/trips/${t._id}`} className="btn">Ver detalle</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}
