import { useEffect, useState } from 'react';
import Post from './Post';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

export default function Posts({ setError }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    })();
  }, []);

  const socketIo = io('http://localhost:8080');
  useEffect(() => {
    const receivePosts = post => {
      setPosts([...posts, post]);
    };

    const receiveComments = commentData => {
      const postIndex = posts.findIndex(p => p._id === commentData.postId);
      if (postIndex >= 0)
      {
        const newPost = {...posts[postIndex] };
        newPost.comments = newPosts.comments || [];
        newPost.comments.push(commentData.comment);
        const newPosts = [...posts];
        newPosts[postIndex] = newPost;
        setPosts(posts);
      }
    };

    socketIo.on('post', receivePosts);
    socketIo.on('comment', receiveComments);

    return () => {
      socketIo.off('post', receivePosts);
      socketIo.off('comment', receiveComments);
    };
  }, [posts, socketIo]);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} setError={setError}/>)}
    </div>
  )
}

Posts.propTypes = {
  setError: PropTypes.func.isRequired
};
