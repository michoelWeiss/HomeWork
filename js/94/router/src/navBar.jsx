import { NavLink } from 'react-router';
import './navBar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
    <ul className="navbar-menu">
      <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
      <li><NavLink to="/aboutUs" className="navbar-link">About Us</NavLink></li>
      <li><NavLink to="/contactUs" className="navbar-link">Contact Us</NavLink></li>
      <li><NavLink to="/buy" className="navbar-link">Buy</NavLink></li>
      <li><NavLink to="/sell" className="navbar-link">Sell</NavLink></li>
    </ul>
  </nav>
  )
}