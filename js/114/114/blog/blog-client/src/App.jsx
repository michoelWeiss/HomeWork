import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AddPost from './AddPost.jsx';
import Posts from './Posts.jsx';
import { useState } from 'react';
import Home from './Home.jsx';

function App() {
  const [error, setError] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home error={error} setError={setError} />}>
          <Route index={true} element={<Posts setError={setError} />} />
          <Route path="/addPost" element={<AddPost setError={setError} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
