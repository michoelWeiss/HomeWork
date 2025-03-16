import React, { useEffect } from 'react';
import './Error.css';

export default function Error({ setError,error }) {
  useEffect(() => {
    setTimeout(() => {
      setError();
    }, 2000)
  }, [error])

  return (
    <h3 className="error">{error}</h3>
  )
}
