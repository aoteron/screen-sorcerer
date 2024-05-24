import React from 'react';
import Link from 'next/link';
import '../../app/styles/footer.css';

export const Footer = () => {
  return (
    <footer className="footer-bg py-4 w-full">
      <div className="container mx-auto footer-container">
        <p className="text-center text-sm">
          &copy; 2024 Screen Sorcerer. All rights reserved.
        </p>
        <nav className="flex justify-center space-x-4 mt-2">
          <Link href="/about" className="footer-link">
            About
          </Link>
          <Link href="/contact" className="footer-link">
            Contact
          </Link>
          <Link href="/privacy" className="footer-link">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
