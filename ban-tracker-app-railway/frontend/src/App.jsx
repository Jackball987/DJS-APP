// src/App.jsx
import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function App() {
  const [bans, setBans] = useState([]);

  useEffect(() => {
    const fetchBans = async () => {
      const { data, error } = await supabase.from('bans').select('*');
      if (error) console.error(error);
      else setBans(data);
    };

    fetchBans();
  }, []);

  return (
    <div>
      <h1>Ban Tracker App</h1>
      {bans.length === 0 ? (
        <p>No bans found.</p>
      ) : (
        <ul>
          {bans.map(ban => (
            <li key={ban.id}>
              {ban.username} was banned for {ban.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
