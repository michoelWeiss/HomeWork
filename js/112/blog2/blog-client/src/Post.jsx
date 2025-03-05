import React from 'react'

export default function Post(props) {
  const { title, author, date, body } = props.post;

  return (
    <div className="post">
      <h2>{title}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()}</h3>
      <p>{body}</p>
    </div>
  )
}
