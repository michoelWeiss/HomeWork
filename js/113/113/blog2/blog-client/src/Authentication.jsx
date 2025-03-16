import React, { useState } from 'react';
import Logout from './Logout';
import Login from './Login';
import './Authentication.css';

export default function Authentication({ setError }) {
  const [username, setUsername] = useState();

  return (
    <div id="authentication">
      {username ? <Logout username={username} setUsername={setUsername} setError={setError} /> : <Login setError={setError} setUsername={setUsername} />}
    </div>
  )
}
