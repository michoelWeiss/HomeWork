import { useState } from 'react';
import PropTypes from 'prop-types';

export default function useForm(props) {
  const [state, setState] = useState(props);

  return [
    state,

    e => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
  ]
}

useForm.propTypes = {
  initialValues: PropTypes.object.isRequired
};
