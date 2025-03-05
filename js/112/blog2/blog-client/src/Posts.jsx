import React, { useEffect, useState } from 'react';
import Post from './Post';
import io from 'socket.io-client';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    const socketIo = io('http://localhost:8080');

    socketIo.on('post', post => {
      setPosts([...posts, post]);
    });

    return () => {
      socketIo.close();
    };
  }, [posts]);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  )
}
