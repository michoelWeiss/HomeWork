import { useState } from 'react'

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
