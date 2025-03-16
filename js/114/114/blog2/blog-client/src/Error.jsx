import { useEffect } from 'react';
import './Error.css';
import PropTypes from 'prop-types';

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

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  setError: PropTypes.func.isRequired
};
