import React from 'react';
import './Login.css';
import useForm from './useForm';

export default function Login({ setUsername, setError }) {
  const [formData, setformData] = useForm({
    username: '',
    password: ''
  });

  async function register(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      // we should rename the error stuff and only errors should show up red
      setError('registration successful');
    } catch (e) {
      console.error(e);

      setError(e.message);
    }
  }

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      setUsername(formData.username);
    } catch (e) {
      console.error(e);

      setError(e.message);
    }
  }

  return (
    <form id="login" onSubmit={login}>
      <input name="username" required placeholder="username" value={formData.username} onChange={setformData} />
      <input name="password" type="password" placeholder="password" required value={formData.password} onChange={setformData} />

      <button>login</button>

      <button type="button" onClick={register}>register</button>
    </form>
  )
}
