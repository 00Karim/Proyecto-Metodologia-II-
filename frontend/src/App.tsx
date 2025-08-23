import React, { useEffect, useState } from "react";
import axios from "axios";

interface Trip {
  _id: string;
  title: string;
  description: string;
}

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/trips").then(res => setTrips(res.data));
  }, []);

  const addTrip = async () => {
    const res = await axios.post("http://localhost:4000/api/trips", { title, description: "Demo trip" });
    setTrips([...trips, res.data]);
    setTitle("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌍 TripMate</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nombre del viaje" />
      <button onClick={addTrip}>Agregar viaje</button>

      <ul>
        {trips.map(t => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
