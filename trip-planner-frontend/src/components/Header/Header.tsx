import React from 'react';
import './Header.css';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import HeaderExtra from './HeaderExtra/HeaderExtra';

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className='header-left'>
            <Logo /> 
            <Navigation />
        </div>
        <div className='header-right'>
            <HeaderExtra />
        </div>
    </header>
  );
};

export default Header;
