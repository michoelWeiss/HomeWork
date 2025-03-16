import PropTypes from 'prop-types';
import './Post.css';
import Comment from './Comment';
import { useState } from 'react';
import AddComment from './AddComment';

export default function Post(props) {
  const { post: {title, author, date, body, comments, _id: id}, setError } = props;

  const [commenting, setCommenting] = useState();

  return (
    <div className="post">
      <h2>{title}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()}</h3>
      <p>{body}</p>
      <div className="comments">
        {commenting ? <AddComment id={id} setCommenting={setCommenting} setError={setError} /> : <button onClick={() => setCommenting(true)}>add comment</button>}
        {comments?.map(c => <Comment key={c.date} comment={c} />)}
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }))
  }).isRequired,
  setError: PropTypes.func.isRequired
};
