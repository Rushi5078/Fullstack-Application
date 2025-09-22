import React, { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("loading...");
  useEffect(() => {
    fetch("/api/hello")
      .then(r => r.json())
      .then(d => setMsg(d.message))
      .catch(e => setMsg("Could not contact API"));
  }, []);
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Sample Fullstack App (No ALB)</h1>
      <p>Backend says: <strong>{msg}</strong></p>
    </div>
  );
}
