import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const apiUrl = import.meta.env.REACT_APP_API_URL;

function App() {
  const [bans, setBans] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/bans`)
      .then((res) => res.json())
      .then((data) => setBans(data))
      .catch((err) => console.error("Failed to load bans:", err));
  }, []);

  return (
    <div>
      <h1>Ban Tracker App</h1>
      <ul>
        {bans.map((ban, index) => (
          <li key={index}>
            User ID: {ban.user_id} | Reason: {ban.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
