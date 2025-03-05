import { Outlet } from 'react-router'
import './App.css';
import Header from './Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
