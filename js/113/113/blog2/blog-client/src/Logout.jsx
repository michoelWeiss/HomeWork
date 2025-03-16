import React from 'react';
import './Logout.css';

export default function Logout({ username, setUsername, setError }) {
  async function logout() {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      setUsername();
    } catch (e) {
      console.error(e);

      setError(e.message);
    }
  }

  return (
    <div id="logout">
      logged in as {username}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
