import useForm from './useForm';
import PropTypes from 'prop-types';

export default function AddComment({id, setCommenting, setError }) {
  const [formData, setFormData] = useForm({
      body: ''
    })

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/posts/${id}/comments`, {
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

      setCommenting(false);
    } catch (e) {
      console.error(e);

      setError(e.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <input name="body" required minLength="3" maxLength="300" value={formData.body} onChange={setFormData} />
      <button>add</button>
      <button type="button" onClick={() => setCommenting(false)}>cancel</button>
    </form>
  )
}

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  setCommenting: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}
