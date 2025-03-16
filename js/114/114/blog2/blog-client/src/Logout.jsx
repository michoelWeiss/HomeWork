import './Logout.css';
import PropTypes from 'prop-types';

export default function Logout({ username, setUsername, setError }) {
  async function logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        //credentials: 'include'
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

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};
