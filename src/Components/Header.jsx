import React from 'react';
import './CSS/Header.css';

const Header = () => {
  return (
    <span className="header" onClick={() => window.scroll(0, 0)}>
      🎬 Entertainment Hub 🎥
    </span>
  );
}

export default Header