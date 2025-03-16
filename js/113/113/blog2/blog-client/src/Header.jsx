import { NavLink } from 'react-router';
import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>PCS ExpressJs, MongoDB, Socket.io blog</h1>

      <NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink>
    </header>
  )
}
