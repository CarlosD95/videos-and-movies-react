import React from 'react';
import './CSS/Header.css';

const Header = () => {

  return (
    <span className="header" onClick={() => window.location.reload()}>
      🎬 Entertainment Hub 🎥
    </span>
  );
}

export default Header