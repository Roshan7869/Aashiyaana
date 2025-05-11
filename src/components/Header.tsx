import React, { useState } from 'react';
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
      {/* Utility Navigation */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container-pad flex justify-end items-center h-10">
          <div className="flex items-center gap-4 text-sm">
            <button className="hover:underline">List your space</button>
            <button className="flex items-center gap-1 hover:underline">
              <Globe size={16} />
              <span>English (US)</span>
            </button>
            <button className="hover:underline">Help</button>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container-pad py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block flex-grow mx-6">
            <div className="flex justify-center">
              <div className="flex border rounded-full shadow-sm overflow-hidden bg-white">
                <button 
                  className={`px-4 py-2 ${isSearchActive ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setIsSearchActive(true)}
                >
                  Stays
                </button>
                <button 
                  className={`px-4 py-2 ${!isSearchActive ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setIsSearchActive(false)}
                >
                  Experiences
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Bar Button (Mobile) */}
          <div className="md:hidden flex-grow mx-4">
            <button 
              className="w-full flex items-center justify-between px-4 py-2 rounded-full shadow-md border bg-white"
              onClick={() => setIsSearchActive(true)}
            >
              <div className="flex items-center">
                <Search size={18} strokeWidth={2.5} />
                <div className="ml-4 text-left">
                  <div className="text-sm font-medium">Where to?</div>
                  <div className="text-xs text-gray-500">Anywhere · Any week</div>
                </div>
              </div>
            </button>
          </div>
          
          {/* User Navigation */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center rounded-full border px-3 py-1 hover:shadow-md transition-shadow">
              <Globe size={16} className="mr-1" />
              <span className="text-sm">EN</span>
            </button>
            <button 
              className="flex items-center gap-2 rounded-full border p-2 hover:shadow-md transition-shadow"
              onClick={toggleMobileMenu}
            >
              <Menu size={18} />
              <User size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Expanded Search Bar (Desktop) */}
        <div className="hidden md:block mt-4">
          <SearchBar active={isSearchActive} />
        </div>
      </div>
    </header>
  );
};

export default Header;