import { useState, useEffect } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const load = () =>
    fetch("/api/items")
      .then((r) => r.json())
      .then(setItems);
  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Full Stack CI/CD Demo - Version 2</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((i) => (
          <li key={i._id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}