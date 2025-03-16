import PropTypes from "prop-types"

export default function Comment({ comment: { author, date, body } }) {
  return (
    <div className="comment">
      <h2>{body}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()}</h3>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired
};
