import React from 'react';
import { X, HelpCircle, Globe as GlobeCopy, LogIn, UserPlus, Plus } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in">
      <div className="container-pad h-full flex flex-col">
        <div className="flex justify-end py-4">
          <button onClick={onClose} className="p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow">
          <nav className="flex flex-col gap-6 pt-6">
            <a href="#" className="flex items-center py-3 border-b border-gray-100">
              <UserPlus size={24} className="mr-4" />
              <span className="font-medium">Sign up</span>
            </a>
            <a href="#" className="flex items-center py-3 border-b border-gray-100">
              <LogIn size={24} className="mr-4" />
              <span className="font-medium">Log in</span>
            </a>
            <a href="/add-property" className="flex items-center py-3 border-b border-gray-100" onClick={onClose}>
              <Plus size={24} className="mr-4" />
              <span className="font-medium">List your space</span>
            </a>
            <a href="#" className="flex items-center py-3 border-b border-gray-100">
              <HelpCircle size={24} className="mr-4" />
              <span className="font-medium">Help</span>
            </a>
            <a href="#" className="flex items-center py-3 border-b border-gray-100">
              <GlobeCopy size={24} className="mr-4" />
              <span className="font-medium">Language: English (US)</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;