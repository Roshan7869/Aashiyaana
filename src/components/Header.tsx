import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, User } from 'lucide-react';
import Logo from './Logo';
import SearchBar from './SearchBar';

interface HeaderProps {
  scrolled: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrolled, toggleMobileMenu }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-pad py-3">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <div className="md:hidden flex-grow mx-3">
            <button 
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-full shadow-sm border bg-white"
              onClick={() => setIsSearchActive(true)}
            >
              <div className="flex items-center">
                <Search size={16} strokeWidth={2.5} />
                <div className="ml-2 text-left">
                  <div className="text-xs font-medium">Where to?</div>
                  <div className="text-xs text-gray-500">Anywhere · Any week</div>
                </div>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Link to="/add-property" className="hidden md:flex items-center rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gray-100 transition-colors">
              List your property
            </Link>
            <button className="hidden md:flex items-center rounded-full border px-2 py-1 hover:shadow-sm transition-shadow">
              <Globe size={14} className="mr-1" />
              <span className="text-xs">EN</span>
            </button>
            <button 
              className="flex items-center gap-1.5 rounded-full border p-1.5 hover:shadow-sm transition-shadow"
              onClick={toggleMobileMenu}
            >
              <Menu size={16} />
              <User size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="hidden md:block mt-3">
          <SearchBar active={isSearchActive} />
        </div>
      </div>
    </header>
  );
};

export default Header;