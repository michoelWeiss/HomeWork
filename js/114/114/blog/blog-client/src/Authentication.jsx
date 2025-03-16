import { useState } from 'react';
import Logout from './Logout';
import Login from './Login';
import './Authentication.css';
import PropTypes from 'prop-types';

export default function Authentication({ setError }) {
  const [username, setUsername] = useState();

  return (
    <div id="authentication">
      {username ? <Logout username={username} setUsername={setUsername} setError={setError} /> : <Login setError={setError} setUsername={setUsername} />}
    </div>
  )
}

Authentication.propTypes = {
  setError: PropTypes.func.isRequired
};
