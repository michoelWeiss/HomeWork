import React from 'react';
import './AddPost.css';
import useForm from './useForm';
import { useNavigate } from 'react-router';

export default function AddPost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useForm({
    title: '',
    body: ''
  })
  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        }
      });

      if (! response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      navigate('/');
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <form id="addPostForm" onSubmit={submit}>
      <label>title: <input name="title" required value={formData.title} onChange={setFormData} /></label>
      <label>post
        <textarea name="body" required value={formData.body} onChange={setFormData}></textarea></label>
      <button>add post</button>
    </form>
  )
}
