import React from 'react'
import { Outlet } from 'react-router'
import './App.css';
import Header from './Header.jsx';
import Authentication from './Authentication.jsx';
import Error from './Error.jsx';

export default function Home({ error, setError }) {
  return (
    <>
      <Header />
      <Error error={error} setError={setError} />
      <Authentication setError={setError} />
      <Outlet />
    </>
  )
}
