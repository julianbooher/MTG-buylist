import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mtgIcon from "../../logos/mtg-favicon.png";


export default function Nav() {
  const user = useSelector(state => state.user);
  const location = useLocation();
  const currentPath = location.pathname;

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null && user.admin === false) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <>
    <div className="nav">
      <Link to="/home">
        <img className="mtg-logo" src={mtgIcon} alt="RF Logo"></img>
      </Link>
      
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {!user.id &&
          <Link className="nav-link" to="/home">
            About
          </Link>
        }
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {user.id && (
          <>
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
    </>
  );
};

