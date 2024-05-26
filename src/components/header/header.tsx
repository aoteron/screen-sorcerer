import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../app/styles/header.css';

export const Header = () => {
  const isLoggedIn =
    typeof window !== 'undefined' &&
    localStorage.getItem('isLoggedIn') === 'true';

  return (
    <header className="header-bg py-4 w-full">
      <div className="container mx-auto header-container">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/noun-wizard-hat-1029343.svg"
            alt="Wizard Hat"
            width={40}
            height={40}
          />
          <span className="header-link">Screen Sorcerer</span>
        </Link>
        <nav className="space-x-4">
          <Link href={isLoggedIn ? '/home' : '/login'} className="nav-link">
            {isLoggedIn ? 'Home' : 'Login'}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
