import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';
import { useUserContext } from '../Hook/useUserContext.jsx';
import { useWorkoutsContext } from '../Hook/WorkoutContext';

function Navbar() {
  // Destructure the necessary values from the contexts
  const { user ,status, dispatch: Userdispatch } = useUserContext();
  const { dispatch } = useWorkoutsContext();

  // Handle logout functionality
  const handleLogout = () => {
    Userdispatch({ type: 'Logout' });
    dispatch({ type: 'SET_WORKOUTS', payload: null});
  };

  // Manage the menu state for responsiveness
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu open or closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return status ? (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">WorkOut Buddy</Link>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item navbar-user">
            {user.user.Username}
                     </li>

            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="navbar-link">Create</Link>
            </li>
            <li className="navbar-item">
              <button className="navbar-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  ) : (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">WorkOut Buddy</Link>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <Link to="/Login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/SignUp" className="navbar-link">Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
